<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">车牌号或卡号</h5>
              <el-input v-model="inputval" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入车牌号或卡号"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;" @click="searchDepart">查询</el-button>
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
                  prop="lpn"
                  label="车牌号"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="cardId"
                  label="卡号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="username"
                  label="司机"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="oilName"
                  label="限加油品"
                  max-width="100">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="confinQty"
                  label="次限加油量(L)"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="frequency"
                  label="日限加油次数"
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
              <!-- 类型 -->
              <el-form-item label="类型" prop="authType" class="animated slideInRight  delay-.1s">
                <el-select style="width:100%;" v-model="ruleForm.authType" placeholder="请选择活动区域">
                  <el-option label="车辆" value="0"></el-option>
                  <el-option label="司机" value="2"></el-option>
                </el-select>
              </el-form-item>
              <!-- 车牌号 -->
              <el-form-item v-if="ruleForm.authType=='0'" label="车牌号" prop="lpn" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.lpn"></el-input>
              </el-form-item>
              <!-- 司机 -->
              <el-form-item  v-if="ruleForm.authType=='2'" label="司机" prop="username" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <!-- 限加油品 -->
              <el-form-item label="限加油品" prop="oilCode" class="animated slideInRight  delay-.1s">
                 <div class="block">
                        <el-cascader
                        style="width:100%;"
                          size="medium"
                          @change="selectOil"
                          :options="optionsP"
                          :props="{ checkStrictly: true,defaultParams }"
                          clearable></el-cascader>
                      </div>
              </el-form-item>
              <!-- 次限加油量(L) -->
              <el-form-item label="次限加油量(L)" prop="confinQty" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.confinQty"></el-input>
              </el-form-item>
              <!-- 日限加油次数 -->
              <el-form-item label="日限加油次数" prop="frequency" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.frequency"></el-input>
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
import {getCarList,delCar,addCar,getOilList,updataOilInfo} from '../../../api/yfyControlCard/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    return {
      oilType:"添加",
      activeName: 'OliList',
      inputval:"",

      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],
      optionsP:[],//油品列表
      defaultParams: {
         label: 'name',
         value: 'id',
         children: 'children'
      },
      ruleForm: {
        authType:"0",
        lpn:"",
        username:"",
        oilCode:"",
        confinQty:"",
        frequency:""
      },
      rules: {
          lpn: [
            { required: true, message: '请输入车牌号', trigger: 'blur' },
            { min: 7, max: 10, message: '请输入正确的车牌号', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入司机名称', trigger: 'blur' },
            { min: 1, max: 10, message: '请输入正确司机名称', trigger: 'blur' }
          ],
      },  
    };
  },
  created(){
    this.getCarLists()
    this.getOilLists()
  },
  components: {},

  computed: {},


  methods: {
    getOilLists(){
      stores.setCarRule().then(res=>{
        // console.log(res)
        this.optionsP = res
      })
    },
    // 选择油品
    selectOil(e){
      var index = e.length-1
      this.ruleForm.oilCode = e[index];

    },
    // 查询油站列表
    searchDepart(){
      this.getCarLists(this.inputval)
    },
 
    // 提交
    submitForm(formName) {
      // console.log(this.ruleForm)
      // return
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.oilType == "修改"){
          updataOilInfo(this.ruleForm).then(res =>{
              if(res.code==0){
                this.activeName="OliList"
                this.oilType = "添加"
                this.ruleForm={
                    lpn:"",
                    username:"",
                    oilCode:"",
                    confinQty:"",
                    frequency:""
                }
              }
          })
        }else{
          addCar(this.ruleForm).then(res =>{
              if(res.code==0){
                this.activeName="OliList"
                this.oilType = "添加"
                 this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.ruleForm={
                 lpn:"",
                    username:"",
                    oilCode:"",
                    confinQty:"",
                    frequency:""
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
            delCar(id).then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getCarLists();
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
    getCarLists(e){
      getCarList({
        page:this.currentPage,
        limit:this.pageSize,
        id:e
      }).then(res =>{
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
        this.getCarLists()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getCarLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getCarLists();
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