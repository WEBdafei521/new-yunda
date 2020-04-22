<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="车辆列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">车牌号</h5>
              <el-input v-model="inputval" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入车牌号"></el-input>
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
                  prop="sim"
                  label="SIM卡号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="devsn"
                  label="设备号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="kmoil"
                  label="百公里油耗(L)"
                  max-width="100">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="createDate"
                  label="添加日期"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="updateDate"
                  label="修改日期"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tankCapacity"
                  label="油箱容量(L)"
                  max-width="100">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="oilName"
                  label="油品"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="vin"
                  label="车架号"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="engine"
                  label="发动机号"
                  max-width="120">
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
              <!-- 车牌号 -->
              <el-form-item label="车牌号" prop="lpn" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.lpn"></el-input>
              </el-form-item>
              <!-- SIM卡号 -->
              <el-form-item label="SIM卡号" prop="sim" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.sim"></el-input>
              </el-form-item>
              <!-- 设备号 -->
              <el-form-item label="设备号" prop="devsn" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.devsn"></el-input>
              </el-form-item>
              <!-- 百公里耗油 -->
              <el-form-item label="百公里耗油(L)" prop="kmoil" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.kmoil"></el-input>
              </el-form-item>
              <!-- 邮箱容量 -->
              <el-form-item label="邮箱容量(L)" prop="tankCapacity" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.tankCapacity"></el-input>
              </el-form-item>
              <!-- 油品 -->
              <el-form-item label="油品" prop="oilCode" class="animated slideInRight  delay-.1s">
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
              <!-- 车架号 -->
              <el-form-item label="车架号" prop="vin" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.vin"></el-input>
              </el-form-item>
              <!-- 发动机号 -->
              <el-form-item label="发动机号" prop="engine" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.engine"></el-input>
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
import {getCarList,delCar,addCar,getOilList,updataOilInfo} from '../../../api/yfyVehicle/index';

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
        lpn:"",
        sim:"",
        devsn:"",
        kmoil:"",
        tankCapacity:"",
        oilCode:'',
        vin:"",
        engine:""
      },
      rules: {
          lpn: [
            { required: true, message: '请输入车牌号', trigger: 'blur' },
            { min: 7, max: 10, message: '请输入正确的车牌号', trigger: 'blur' }
          ],
          tankCapacity: [
            { required: true, message: '请输入邮箱容量', trigger: 'blur' },
            { min: 1, max: 10, message: '请输入正确的邮箱容量', trigger: 'blur' }
          ],
          oilCode: [
            { required: true, message: '请输入油品类型', trigger: 'blur' },
            { min: 1, max: 10, message: '请输入正确的油品类型', trigger: 'blur' }
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
        console.log(res)
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
      console.log(this.ruleForm)
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
                  sim:"",
                  devsn:"",
                  kmoil:"",
                  tankCapacity:"",
                  oilCode:'',
                  vin:"",
                  engine:""
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
                  sim:"",
                  devsn:"",
                  kmoil:"",
                  tankCapacity:"",
                  oilCode:'',
                  vin:"",
                  engine:""
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
      console.log(row)
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
        lpn:e
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
      if(tab.label == "车辆列表"){
        this.oilType = "添加";
          this.ruleForm={
                  lpn:"",
                  sim:"",
                  devsn:"",
                  kmoil:"",
                  tankCapacity:"",
                  oilCode:'',
                  vin:"",
                  engine:""
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