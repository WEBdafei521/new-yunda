<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="司机列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">司机名称</h5>
              <el-input v-model="inputval" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入司机名称"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="userId"
                  label="司机编号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="departName"
                  label="石油公司/站点"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="username"
                  label="用户名"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="name"
                  label="司机名称"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="mobile"
                  label="手机号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  label="操作"
                  max-width="150">
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
              <!-- 授权码 -->
              <el-form-item label="授权码" prop="orgCode" class="animated slideInRight  delay-.1s">
                <el-input disabled  v-model="orgCode"></el-input>
              </el-form-item>
              <!-- 部门名称 -->
              <el-form-item label="用户名称" prop="username" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <!-- 部门名称 -->
              <el-form-item label="姓名" prop="name" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <!-- 联系人 -->
              <el-form-item label="密码" prop="password" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <!-- 手机号 -->
              <el-form-item label="手机号" prop="mobile" class="animated slideInRight  delay-.1s">
                <el-input v-model.number="ruleForm.mobile"></el-input>
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
import {getDriverList,delDriver,checkUserName,addDriverUser,updateDriverUser} from '../../../api/yfyDriver/index';
import * as stores from '../../../store/methods'
export default {
  data () {
      // 检测姓名
      var checkAbbreviation = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        }
      };
      var checkUsername = (rule, value, callback) => {
        if(this.oilType != "修改"){
          if(!value){
            return callback(new Error('请输入用户名'));
          } else{
            checkUserName({username:value}).then(res => {
              if (res.code == 1) {
                  return callback(new Error('用户名已被使用'));
              }
            })
          }
        }else{
          if(!value){
            return callback(new Error('请输入用户名'));
          }
        }
      };
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系人不能为空'));
        }
        setTimeout(() => {
            value = value+""
            if(!(/^1[3456789]\d{9}$/.test(value))){ 
                callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
        }, 1000);
      };
      var checkPassword = (rule, value, callback) => {
        if(this.oilType != "修改"){
          if (!value) {
            return callback(new Error('联系人不能为空'));
          }
        }
        
      };
      
    return {
      oilType:"添加",
      activeName: 'OliList',
      inputval:"",

      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],
      orgCode:"",
      ruleForm: {
        username:"",
        name:"",
        password:"",
        mobile:"",
        status:2,
        innerType:'0',
        about:"",
        tag:""
      },
      rules: {
          // 简称
          name:[
            {validator: checkAbbreviation, trigger: 'blur'}],
          // 用户名
          username:[
            {validator: checkUsername, trigger: 'blur'} ],
          // 手机号
          mobile:[
            {validator: checkPhone, trigger: 'blur'} ],
            // 密码
          password:[
            {validator: checkPassword, trigger: 'blur'} ],
      },
    };
  },
  created(){
    var userInfo = stores.getLoginUser()
    this.orgCode = userInfo.orgCode
    this.getDriverLists()
  },
  components: {},

  computed: {},


  methods: {
    // 查询油站列表
    searchDepart(){
      this.getDriverLists(this.inputval)
    },
 
    // 提交
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("success")
          } else {
            return false;
          }
        });
        if(this.oilType == "修改"){
          updateDriverUser(this.ruleForm).then(res =>{
              if(res.code==0){
                this.activeName="OliList"
                this.oilType = "添加"
                this.ruleForm={
                  mobile:"",
                  password:"",
                  name:"",
                  email:""
                }
              }
          })
        }else{
          addDriverUser(this.ruleForm).then(res =>{
              if(res.code==0){
                this.activeName="OliList"
                this.oilType = "添加"
                this.ruleForm={
                  mobile:"",
                  password:"",
                  name:"",
                  email:""
                }
              }
          })
        }
        
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
    delStatusRowStatusRow(index, row){
      var _this = this
			var id = [row.id]
      this.$confirm('确定要删除此司机吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delDriver(id).then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getDriverLists();
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
    getDriverLists(e){
      getDriverList({
        page:this.currentPage,
        limit:this.pageSize,
        type:"0",
        status:"2", 
        key:e
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
      if(tab.label == "加油站列表"){
        this.oilType = "添加";
        this.ruleForm.address=""
        this.ruleForm.attn=""
        this.ruleForm.cityStr=""
        this.ruleForm.email=""
        this.ruleForm.logo=""
        this.ruleForm.mobile=""
        this.ruleForm.notes=""
        this.getDriverLists()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getDriverLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getDriverLists();
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