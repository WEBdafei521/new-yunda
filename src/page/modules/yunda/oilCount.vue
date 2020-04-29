<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="车辆加油明细查询" name="OliList" class=""> 
            <div class="l-display">
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
              
              <h5 style="color:#000;margin:0 10px;">车牌号</h5>
              <el-input v-model="lpn" placeholder="请输入车牌号" style="width:200px;"></el-input>
              <h5 style="color:#000;margin:0 10px;">司机</h5>
              <el-input v-model="driver" placeholder="请输入司机名称" style="width:200px;"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="stationName"
                  label="加油站点"
                  max-width="60">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="operatorname"
                  label="司机"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="lpn"
                  label="车牌号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="oilName"
                  label="油品"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="qty"
                  label="加油量"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="settlement"
                  label="金额"
                  max-width="150">
                </el-table-column>
            

                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="oiltime"
                  label="加油时间"
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
      driver:"",
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
 

    // 查询油站列表
    searchDepart(){
      this.getOilLists()
    },
    
    // 获取油品列表
    getOilLists(e){
      stores.getList({
        page:this.currentPage,
        limit:this.pageSize,
        startTime:this.startTime,
        endTime:this.endTime,
        lpn:this.lpn,
        driver:this.driver
      },"yunda/yfytoiltrade/list").then(res =>{

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