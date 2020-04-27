<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="车辆计划授权管理" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">石油公司</h5>
              <el-select v-model="orgCodeValue" clearable @change="selectCompany" placeholder="请选择">
                <el-option
                  v-for="item in companyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <h5 style="color:#000;margin:0 10px;">加油站</h5>
              <el-select v-model="orgCodeValue1" clearable placeholder="请选择">
                <el-option
                  v-for="item in stationOptions"
                  
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <h5 style="color:#000;margin:0 10px;">车牌号</h5>
              <el-input v-model="lpn" style="width:200px;"></el-input>
              <h5 style="color:#000;margin:0 10px;">时间</h5>
              <el-date-picker
                @change="selectTime"
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="deptName"
                  label="油站"
                  max-width="60">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="lpn"
                  label="车牌号"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="preAuthQuantity"
                  label="修改前授权量"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="preAuthTimeType"
                  label="修改前授权周期"
                  max-width="150">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.preAuthTimeType == 1 " size="big" type="success">月</el-tag>
                    <el-tag v-if="scope.row.preAuthTimeType == 2 " size="mini" type="success">季度</el-tag>
                    <el-tag v-if="scope.row.preAuthTimeType == 3 " size="mini" type="success">年</el-tag>
                    <el-tag v-if="scope.row.preAuthTimeType == 9 " size="mini" type="success">不限</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="aftAuthQuantity"
                  label="修改前剩余授权量"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="aftAuthQuantity"
                  label="修改后授权量"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="aftAuthTimeType"
                  label="修改后授权周期"
                  max-width="150">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.aftAuthTimeType == 1 " size="big" type="success">月</el-tag>
                    <el-tag v-if="scope.row.aftAuthTimeType == 2 " size="mini" type="success">季度</el-tag>
                    <el-tag v-if="scope.row.aftAuthTimeType == 3 " size="mini" type="success">年</el-tag>
                    <el-tag v-if="scope.row.aftAuthTimeType == 9 " size="mini" type="success">不限</el-tag>
                  </template>
                </el-table-column>

                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="updateUser"
                  label="修改人"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="updateTime"
                  label="修改时间"
                  max-width="150">
                </el-table-column>
              </el-table>
              
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="0"
                :page-sizes="[10, 30, 40, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="sizeLength">
              </el-pagination>
            </div>
            
          </el-tab-pane>

        </el-tabs>
      </div>
  </div>
</template>

<script>
import {getOilList,saveOilType,getGun} from '../../../api/goods/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    var checkPrice = (rule, value, callback) => {
      var isMoney = stores.testMoney(value)
        if (!isMoney) {
          return callback(new Error('请输入正确的油价'));
        }
      };
    return {
      activeName: 'OliList',
      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],

      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      value2:"",
      startTime:"",
      endTime:"",

      companyOptions:[],
      orgCodeValue:"",
      orgCodeValue1:"",
      stationOptions:[],
      goodsCode:"",
      lpn:"",
      
      // 选择油品类型
      optionsP:[],
      defaultParams: {
         label: 'name',
         value: 'id',
         children: 'children'
      },

      
    };
  },
  created(){
    this.getOilLists()
    this.getOilTypeList()
    stores.getDepartLists().then(res => {
      var company = res[0].children
      company.forEach(item=>{
        item.value = item.orgCode
        item.label =item.departname
      })
      this.companyOptions = company
    })
  },
  components: {},

  computed: {},


  methods: {
    selectTime(e){
      this.startTime = e[0]
      this.endTime = e[1]
    },
    getOilTypeList(){
      stores.setCarRule().then(res=>{
        this.optionsP = res
      })
    },
    selectCompany(e){
      var station = []
      for(var item of this.companyOptions){
        if(e==item.orgCode){
          for(var items of item.children){
            items.value = items.orgCode
            items.label = items.departname
            station.push(items)
          }
        }
      }
      this.stationOptions = station
    },

    // 查询油站列表
    searchDepart(){
      this.getOilLists()
    },
    
    // 获取油品列表
    getOilLists(e){
      stores.getList({
        page:this.currentPage,
        limit:this.pageSize,
        staTime:this.startTime,
        endTime:this.endTime,
        orgCode:this.orgCodeValue?this.orgCodeValue:this.orgCodeValue1,
        lpn:this.lpn,
        authType:"1",
      },"auth/yfybvehauthinfo/list").then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getOilLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getOilLists();
    },
    
  }
}

</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .l-display{
    display: flex;
    align-items: center;
    margin: 8px 0;
  }
  .l-display-item{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 16px 0;
  }
  .l-display-cum{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>