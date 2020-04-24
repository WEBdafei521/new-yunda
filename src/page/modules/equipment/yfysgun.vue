<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">枪号</h5>
              <el-input v-model="inputValue" style="width:200px;"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
          <el-tab-pane label="油枪列表" name="OliList" class=""> 
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="deptName"
                  label="所属油站"
                  width="130">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="gunNo"
                  label="枪号"
                  width="80">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="controllerNo"
                  label="智能控制器编号"
                  width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tankNo"
                  label="罐号"
                  width="80">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="price"
                  label="单价"
                  width="80">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="goodsName"
                  label="油品"
                  width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="protocolType"
                  label="协议类型"
                  width="100">
                </el-table-column>

              
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  label="操作"
                  width="400">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="updataPrice(scope.$index, scope.row)">调价</el-button>
                    <el-button type="primary" @click="updata(scope.$index, scope.row)">下发配置</el-button> 
                    <el-button type="primary" @click="updata(scope.$index, scope.row)">修改</el-button> 
                    <el-button type="danger" @click="delStatusRow(scope.$index, scope.row)">删除</el-button> 
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="油品调价"
                append-to-body
                :visible.sync="dialogVisible"
                width="40%">
                <div class="l-display-cum">
                  
                  <div class="l-display-item">
                    <h5 class="l-display-item" style="color:#000;">油枪号</h5>
                    <el-input disabled v-model="gunNo" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 class="l-display-item" style="color:#000;">原始单价<span>(元/升)</span></h5>
                    <el-input disabled v-model="oldPrice" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 class="l-display-item" style="color:#000;">新价格 <span>(元/升)</span></h5>
                    <el-input v-model="newPrice" style="width:200px;"></el-input>
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
      inputValue:"",
      dialogVisible:false,
      
      // 调价数据
      gunNo:"",
      oldPrice:"",
      newPrice:"",

      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],

      ruleForm: {
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
    this.getList()
  },
  components: {},

  computed: {},


  methods: {
    // 调价
    updataPrice(index,row){
      console.log(row)
      this.dialogVisible = true
    },
    // 选择油品
    selectTank(e){ 
      this.unloadOiltankid = e
    },
    searchDepart(){
      this.getList()
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
            stores.deleteListItem(id,"equipment/yfysgun/delete").then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getList();
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
    getList(e){
      stores.getList({
        page:this.currentPage,
        limit:this.pageSize,
        orgCode:"",
        gunNo:this.inputValue,
        tankNo:"",
        controllerNo:"",
      },"equipment/yfysgun/list").then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
      if(tab.label == "油枪列表"){
        this.oilType = "添加";
          this.ruleForm={
                    lpn:"",
                    username:"",
                    oilCode:"",
                    confinQty:"",
                    frequency:""
                }
        this.getList()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getList();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getList();
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
    justify-content: space-between;
    align-items: center;
  }
  .l-display-cum{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>