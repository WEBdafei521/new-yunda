<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="计入列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">进油日期</h5>
              <el-date-picker
                v-model="inputval"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
              </el-date-picker>
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
                  prop="purchaseOrderNum"
                  label="进油单号"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="carrier"
                  label="承运商"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="primaryVolume"
                  label="原发体积(L)"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="oiltankCarNo"
                  label="油罐车号"
                  max-width="100">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="meteringStaff"
                  label="计量员"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="purchaseDate"
                  label="进油日期"
                  max-width="150">
                </el-table-column>

                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="carrierDriver"
                  label="承运司机"
                  max-width="150">
                </el-table-column><el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="unloadOiltank"
                  label="卸入油罐"
                  max-width="150">
                </el-table-column><el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="supplier"
                  label="供应商"
                  max-width="150">
                </el-table-column><el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="unloadOilNum"
                  label="实际卸油(L)"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="updata(scope.$index, scope.row)">修改</el-button>
                    <el-button type="danger" @click="delStatusRow(scope.$index, scope.row)">删除</el-button> 
                  </template>
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

          <el-tab-pane :label="oilType" name="addList">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!-- 进油单号 -->
              <el-form-item label="进油单号" prop="purchaseOrderNum" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.purchaseOrderNum"></el-input>
              </el-form-item>
              <!-- 承运商 -->
              <el-form-item  label="承运商" prop="carrier" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.carrier"></el-input>
              </el-form-item>
              <!-- 原发体积(L) -->
              <el-form-item label="原发体积(L)" prop="primaryVolume" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.primaryVolume"></el-input>
              </el-form-item>
              <!-- 油罐车号 -->
              <el-form-item label="油罐车号" prop="oiltankCarNo" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.oiltankCarNo"></el-input>
              </el-form-item>
              <!-- 计量员 -->
              <el-form-item label="计量员" prop="meteringStaff" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.meteringStaff"></el-input>
              </el-form-item>

              <!-- 进油日期 -->
              <el-form-item label="进油日期" prop="purchaseDate" class="animated slideInRight  delay-.1s">
                  <el-date-picker
                    style="width:100%;"
                    v-model="ruleForm.purchaseDate"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择进油日期">
                  </el-date-picker>
              </el-form-item>
              <!-- 承运司机 -->
              <el-form-item label="承运司机" prop="carrierDriver" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.carrierDriver"></el-input>
              </el-form-item>
              <!-- 卸入油罐 -->
              <el-form-item label="卸入油罐" prop="unloadOiltank" class="animated slideInRight  delay-.1s">
                <el-select @change="selectTank" v-model="ruleForm.unloadOiltank" placeholder="请选择">
                  <el-option
                    style="width:100%;"
                    v-for="(item,index) of oilTypeList"
                    :key="index"
                    :label="'油罐号:' + item.label"
                    :value="item.label">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 供应商 -->
              <el-form-item label="供应商" prop="supplier" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.supplier"></el-input>
              </el-form-item>
              <!-- 实际卸油(L) -->
              <el-form-item label="实际卸油(L)" prop="unloadOilNum" class="animated slideInRight  delay-.1s">
                <el-input v-model.number="ruleForm.unloadOilNum"></el-input>
              </el-form-item>
            

              <!-- 提交 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import {getOilRecordList,delOilRecord,getOilList,saveOilRecord,updataOilInfo} from '../../../api/oilRecord/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    return {
      oilType:"添加",
      activeName: 'OliList',
      oilTypeList: [],
      // 时间配置
      inputval:"",
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
      startTime:"",
      endTime:"",
      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],
      ruleForm: {
        purchaseOrderNum:"",
        carrier:"",
        primaryVolume:"",
        oiltankCarNo:"",
        meteringStaff:"",
        purchaseDate:"",
        carrierDriver:"",
        unloadOiltank:"",
        supplier:"",
        unloadOilNum:"",
        unloadOiltankid:""
      },
      rules: {
          purchaseOrderNum: [
            { required: true, message: '请输入进油单号', trigger: 'blur' },
            { min: 5, max: 10, message: '请输入正确的进油单号', trigger: 'blur' }
          ],
          purchaseDate: [
            { required: true, message: '请选择进油日期', trigger: 'blur' }
          ],
          unloadOiltank: [
            { required: true, message: '请选择所卸入的油罐', trigger: 'blur' },
            { min: 1, max: 10, message: '请输入正确油罐', trigger: 'blur' }
          ],
      },  
    };
  },
  created(){
    this.getOilRecordLists()
    this.getOilList()
  },
  components: {},

  computed: {},


  methods: {
    // 选择油品
    selectTank(e){ 
      this.unloadOiltankid = e
    },
    // 获取油品列表
    getOilList(){
      getOilList({page:1,limit:2000}).then(res => {
        // console.log(res)
        var oilTypeList = res.page.list;
        oilTypeList.forEach(item =>{
          item.value = item.goodsName
          item.label = item.tankNo
        })
        // console.log(oilTypeList)
        this.oilTypeList = oilTypeList
      })
    },
    // 选择油品
    selectOil(e){
      var index = e.length-1
      this.ruleForm.oilCode = e[index];

    },
    // 查询油站列表
    searchDepart(){
      this.startTime = this.inputval[0]
      this.endTime = this.inputval[1]
      this.getOilRecordLists()
    },
 
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.oilType == "修改"){
              updataOilInfo(this.ruleForm).then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        purchaseOrderNum:"",
                        carrier:"",
                        primaryVolume:"",
                        oiltankCarNo:"",
                        meteringStaff:"",
                        purchaseDate:"",
                        carrierDriver:"",
                        unloadOiltank:"",
                        supplier:"",
                        unloadOilNum:"",
                        unloadOiltankid:""
                    }
                  }
              })
            }else{
              saveOilRecord(this.ruleForm).then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        purchaseOrderNum:"",
                        carrier:"",
                        primaryVolume:"",
                        oiltankCarNo:"",
                        meteringStaff:"",
                        purchaseDate:"",
                        carrierDriver:"",
                        unloadOiltank:"",
                        supplier:"",
                        unloadOilNum:"",
                        unloadOiltankid:""
                    }
                  }else{
                    this.$message({
                      type: 'info',
                      message: res.msg
                    });
                  }
              })
            }
          } else {
            return false;
          }
        });
        
        
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改部门信息
    updata(index,row){
      this.ruleForm = row;
      // console.log(row)
      this.activeName = "addList"
      this.oilType = "修改"
    },
    // 删除
    delStatusRow(index, row){
      var _this = this
			var id = [row.id]
      this.$confirm('确定要删除此司机吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delOilRecord(id).then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getOilRecordLists();
              } else {
                alert(r.msg);
              }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    // 获取部门列表
    getOilRecordLists(e){
      getOilRecordList({
        page:this.currentPage,
        limit:this.pageSize,
        startTime:this.startTime,
        endTime:this.endTime,
      }).then(res =>{
        // console.log(res)
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
      if(tab.label == "列表"){
        this.oilType = "添加";
          this.ruleForm={
                    lpn:"",
                    username:"",
                    oilCode:"",
                    confinQty:"",
                    frequency:""
                }
        this.getOilRecordLists()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getOilRecordLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getOilRecordLists();
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
</style>