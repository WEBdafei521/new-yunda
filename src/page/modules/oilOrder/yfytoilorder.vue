<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="临时授权管理" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">开始日期</h5>
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
              <h5 style="color:#000;margin:0 10px;">司机</h5>
              <el-select v-model="driver" clearable placeholder="请选择">
                <el-option
                  v-for="item in driverOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <h5 style="color:#000;margin:0 10px;">车牌号</h5>
              <el-select v-model="lpn" clearable placeholder="请选择">
                <el-option
                  v-for="item in carOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="id"
                  label="ID"
                  max-width="60">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="username"
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
                  prop="dooilnum"
                  label="申请数量"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="createTime"
                  label="申请时间"
                  max-width="150">
                </el-table-column>

                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tradeflag"
                  label="状态"
                  max-width="150">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.tradeflag == '4' " size="big" type="info">待审核</el-tag>
                    <el-tag v-else-if="scope.row.tradeflag == '6' " size="big" type="danger">未通过</el-tag>
                    <el-tag v-else size="big" type="success">已通过</el-tag>
                  </template>
                </el-table-column>

                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tradeflag"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button  v-if="scope.row.tradeflag == 4 " type="primary" @click="updataPrice(scope.$index, scope.row)">审核</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="审核"
                append-to-body
                :visible.sync="dialogVisible"
                width="30%">
                <div class="l-display-cum">
                  <div class="l-display-item">
                    <h5 style="color:#000;margin:0 10px;">授权周期 </h5>
                    <el-select v-model="tradeflag" placeholder="请选择">
                      <el-option
                        v-for="item in gunOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="tiaojia">确 定</el-button>
                </span>
              </el-dialog>
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
    return {
      activeName: 'OliList',
      dialogVisible:false,
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
      lpn:"",
      
      carOptions:[],
      driverOptions:[],
      
      updataRow:{},
      tradeflag:"4",
      // 选择油品类型

      gunOptions:[{
				label:"暂不处理",
				value:"4"
			},
			{
				label:"通过",
				value:"5"
			},{
				label:"不通过",
				value:"6"
			}]
    };
  },
  created(){
    this.getOilLists()
    stores.getList({page:1,limit:1000,status:2},"sys/user/list").then(res =>{
      var list =res.page.list;
      list.forEach((item,index) => {
        item.value = item.userId
        item.label = item.mobile
      })
      this.driverOptions = list
    })
    stores.getList({page:1,limit:1000},"yunda/yfybvehicle/list").then(res =>{
      var list =res.page.list;
      list.forEach((item,index) => {
        item.value = item.lpn
        item.label = item.lpn
      })
      this.carOptions = list
    })
  },
  components: {},

  computed: {},


  methods: {
    // 查询油站列表
    searchDepart(){
      this.getOilLists()
    },
    selectTime(e){
      this.startTime = e[0]
      this.endTime = e[1]
    },
  
    // 调价
    updataPrice(index,row){
      this.updataRow = row
      this.dialogVisible=true
    },
    tiaojia(){
      this.updataRow.tradeflag = this.tradeflag
      stores.updata(this.updataRow,"oilOrder/yfytoilorder/update").then(res => {
        if(res.code == 0){
          this.$message({
                  type: 'success',
                  message: res.msg
                });
          this.dialogVisible=false;
          this.updataRow = {};
        }else{
          this.$message({
                  type: 'info',
                  message: res.msg
                });
                this.dialogVisible=false;
          this.updataRow = {};
        }
      })
     
    },
    
    // 获取油品列表
    getOilLists(e){
      stores.getList({
        page:this.currentPage,
        limit:this.pageSize,
        lpn:this.lpn,
        startTime:this.startTime,
        endTime:this.endTime,
        driver:this.driver,
      },"oilOrder/yfytoilorder/list").then(res =>{
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