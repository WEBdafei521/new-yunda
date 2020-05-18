<template>
  <div>
      <div class="animated slideInRight delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="员工列表" name="OliList" class="animated slideInRight delay-1s"> 
            <div class="my_display">
              <h5 style="color:#000;margin:0 10px;">用户名称</h5>
              <el-input v-model="searchName" style="width:220px;height:40px;margin:0 10px;" clearable placeholder="请输入内容"></el-input>
              <el-button type="primary" @click="searchBtn" style="height:40px;line-height:0px;">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="username"
                  label="用户名称"
                  width="150">
                </el-table-column>
                 <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="orgCode"
                  label="机构编号"
                  width="200">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="departName"
                  label="石油公司/油站"
                  width="250">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="roleName"
                  label="角色"
                  width="200">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="email"
                  label="邮箱"
                  width="250">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="status"
                  label="状态"
                  max-width="200">
                  <template slot-scope="scope">
                    <span class="label label-danger " style="background:red;padding:6px;color:#fff;font-weight:600;"  v-if="scope.row.status == '0' " >禁用</span>
                    <span class="label label-success" style="background:green;padding:6px;color:#fff;font-weight:600;" v-else>正常</span>
                  </template>
                </el-table-column>
                 <el-table-column label="操作" width="300" className="animated slideInRight  delay-.1s">
                   <template slot-scope="scope">
                     <el-button @click="updateInfo(scope.$index, scope.row)" type="primary">修改</el-button>  
                     <el-button type="danger" @click="delectUser(scope.$index, scope.row)">删除</el-button>  
                   </template>
                    
                 </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="7"
                layout="total, sizes, prev, pager, next, jumper"
                :total="sizeLength">
              </el-pagination>
            </div>
          </el-tab-pane>

          <el-tab-pane :label="addOilType" name="addList">
              <div>
                <el-col :span="24">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile" class="animated slideInRight  delay-.1s">
                      <el-input type="number" v-model="ruleForm.mobile"></el-input>
                    </el-form-item>

                    <el-form-item label="石油公司/加油站" prop="orgCode" class="animated slideInRight  delay-.1s">
                      <div class="block">
                        <el-cascader
                        style="width:100%;"
                          size="medium"
                          @change="selectDepart"
                          :options="optionsP"
                          :props="{ checkStrictly: true,defaultParams }"
                          clearable></el-cascader>
                      </div>
                    </el-form-item>
                    
                    <el-form-item label="角色" prop="roleIdList" class="animated slideInRight  delay-.1s">
                      <el-transfer v-model="ruleForm.roleIdList" :data="optionsR" :titles="['角色列表', '已选中角色']" :button-texts="['去除', '选中']" @change="selectRole"></el-transfer>
                    </el-form-item>
                    
                    <el-form-item label="状态" prop="status" class="animated slideInRight  delay-.1s">
                      <template>
                        <el-select v-model="ruleForm.status" placeholder="请选择">
                          <el-option
                            v-for="item in optionsS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                      <el-button @click="cancelSubmit">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </div>
            
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import {getMangeList,delectItem,getRoleList,getDepartList,addRoleSave,updateRoleSave} from '../../../api/sysUser/index'
import * as stores from '../../../store/methods'
import { Message } from 'element-ui'
export default {
  data () {
    var checkPhone = (rule, value, callback) =>{
      if (value === '') {
	          callback(new Error('请输入手机号'));
	        } else {
	        	var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	        	 if (!phoneReg.test(value)) {
	                 callback(new Error('格式有误'))
	               } else {
	                 callback()
	               }
	          callback();
	        }
    }
    // 校检角色
    var validateRole = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请选择角色'));
      } else {
        callback();
      }
    };
    // 校检密码
    var validatePass = (rule, value, callback) => {
      // console.log(value)
      if (value == undefined ) {
        callback(new Error('请输入密码'));
      } else {
          if ((value.length<6 || value.length>18)){
            callback(new Error('请输入6-18位字母或数字'));
          } else {
            callback();
          } 
      }
    };
    return {
      activeName: 'OliList',
      addOilType:"添加",
      sizeLength:50,
      currentPage:1,
      limit:"10",
      searchName:"",
      tableData: [],
      ruleForm: {
          username:"",
          password:"",
          email:"",
          mobile:"",
          roleIdList:[],
          status:"正常",
          orgCode:"",
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, trigger: 'blur',validator: validatePass },
          ],
          mobile: [
             { required: true,  trigger: 'blur',validator: checkPhone },
          ],
           email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 5, max:50, message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          roleIdList: [
            { required: true,  trigger: 'blur',validator: validateRole},
          ],
           orgCode: [
            { required: true, message: '请选择部门', trigger: 'blur' }
          ],
      },
      optionsS:[{
        value: '正常',
        label: '正常'
      },{
        value: '禁用',
        label: '禁用'
      }],
      optionsP: [],//部门列表
      defaultParams: {
         label: 'name',
         value: 'id',
         children: 'children'
      },
      optionsR:[],//角色列表
      
    };
  },

  created(){ },
  
  mounted() {
    this.query()
    // 获取角色列表
    this.getRoleLists()
    // 获取部门列表
    stores.getDepartLists().then(res =>{
      this.optionsP = res;
    })
  },
  methods: {
    cancelSubmit(){
      this.ruleForm={
          username:"",
          password:"",
          email:"",
          mobile:"",
          roleIdList:[],
          status:"正常",
          orgCode:"",
      }
      this.activeName = "OliList"
        this.addOilType="添加"
    },
    selectDepart(e){
      var index = e.length-1
      this.ruleForm.orgCode = e[index];
    },
    getRoleLists(){
      getRoleList().then(res =>{
        res.list.forEach((item,index)=>{
          item.key = item.roleId
          item.label = item.roleName
        })
        this.optionsR = res.list
      })
    },
    selectRole(e){ },
    submitForm(formName) {
      // console.log(this.ruleForm)
        var _this = this;
        if(this.ruleForm.status == "正常"){
          this.ruleForm.status=1
        }
        if(this.ruleForm.status == "禁用"){
          this.ruleForm.status=0
        }
        // return
        if(this.addOilType=="修改"){
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              updateRoleSave(_this.ruleForm).then(res=>{
                if(res.code == 0){
                  Message({
                      message:res.msg,
                      type: 'success',
                      duration: 3 * 1000
                    })
                    _this.addOilType="添加"
                    _this.activeName = "OliList"
                }else{
                  Message({
                      message: '错误信息:'+res.msg,
                      type: 'error',
                      duration: 3 * 1000
                    })
                }
              })
            } else {
              Message({
                message: '信息填写有误',
                type: 'error',
                duration: 3 * 1000
              })
              return false;
            }
          });
        }else{
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              addRoleSave(_this.ruleForm).then(res=>{
                if(res.code == 0){
                  Message({
                      message:res.msg,
                      type: 'success',
                      duration: 3 * 1000
                    })
                    _this.addOilType="添加"
                    _this.activeName = "OliList"
                }else{
                  Message({
                      message: '错误信息:'+res.msg,
                      type: 'error',
                      duration: 3 * 1000
                    })
                }
              })
            } else {
              Message({
                message: '信息填写有误',
                type: 'error',
                duration: 3 * 1000
              })
              return false;
            }
          });
        }
       
    },
    updateInfo(index,row){
        this.activeName = "addList"
        this.addOilType="修改"
        var row = stores.getroleRules(row,this.optionsR)
         this.ruleForm = row;
    },
    // 查询按钮
    searchBtn(){
      this.currentPage = 1;
      this.query();
    },
    // 删除用户
    delectUser(index, row){
      var _this = this
      var userId = [row.userId]
      var status = row.status == '0' ? "启用":"停用";
      this.$confirm('确定要删除此用户吗?', '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log("success")
            delectItem(userId).then(res =>{
              _this.$message({
                type: 'success',
                message: res.msg
              }); 
              _this.query()  
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除已取消'
          });          
        });
    },
    // 获取油站列表
    query(){
      var _this = this;
      var data = {
        status:"1",
        page: _this.currentPage,
        limit: _this.limit,
        key: _this.searchName
      }
      getMangeList(data).then(res => {
        if(res.code==0){
          _this.tableData=[];
          for(var item of res.page.list){
              _this.tableData.push(item);
          }
            _this.sizeLength=res.page.totalCount;
          
        }
      })
    },
    handleClick(tab, event) {
      if(tab.name=="OliList"){
        this.addOilType="添加"
        this.ruleForm= {
          username:"",
          password:"",
          email:"",
          mobile:"",
          roleIdList:[],
          status:1,
          orgCode:"",
        }
      }
      // console.log(tab, event);
    },
    handleSizeChange(val) {
      var _this = this;
      _this.limit = val;
        // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var _this = this;
      _this.currentPage = val;
      _this.query();
      console.log(`当前页: ${val}`);
    }
  },
  computed: {
  },
  watch: {
  }
}

</script>
<style scoped>
.my_display{
  display: flex;
  align-items: center;
}
.el-dialog{
  width: 30%;
  z-index: 99999999999;
}
.aaa{
  z-index: 9999999;
  top: -50vh;
}
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
</style>