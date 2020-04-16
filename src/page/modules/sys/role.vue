<!--  -->
<template>
  <div>
    <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="用户列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">检索用户</h5>
              <el-input v-model="inputval" style="width:220px;height:40px;margin-right:10px;" clearable placeholder="请输入用户名称"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  fixed
                  prop="roleId"
                  label="角色ID"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="roleName"
                  label="角色名称"
                  max-width="150">
                </el-table-column>
                
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="createTime"
                  label="创建时间"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="remark"
                  label="备注"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  label="操作"
                  max-width="150">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="updata(scope.$index, scope.row)">修改</el-button>
                    <el-button type="danger" @click="updateStatusRow(scope.$index, scope.row)">删除</el-button>
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
              <!-- 部门名称 -->
              <el-form-item label="用户名称" prop="roleName" class="animated slideInRight delay-1s">
                <el-input v-model="ruleForm.roleName"></el-input>
              </el-form-item>
              <!-- 备注 -->
               <el-form-item label="备注" prop="remark" class="animated slideInRight  delay-1s">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
              </el-form-item>

              <div class="l-quanxian animated slideInRight  delay-1s">
                <div>
                  <el-tree
                    :data="data"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
                  </el-tree>
                </div>
                
              </div>
              

              <div class="buttons">
                <el-button @click="getCheckedKeys">通过 key 获取</el-button>
              </div>



              <!-- 提交 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="reback">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import {getUserList,getMenuTree,setUserInfo} from '../../../api/role/index';
import * as stores from '../../../store/methods'
export default {
  components: {},
  data () {
    var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('部门名称不能为空'));
        }
      };
    return {
      data: [],
      defaultProps: {
          children: 'children',
          labels: 'label'
      },
      activeName: 'OliList',
      oilType:"添加用户",
      currentPage:"1",
      pageSize:"10",
      inputval:"",
      tableData:[],
      sizeLength:1,
      currPage:"",

      ruleForm: {
        roleName:"",
        remark:""
      },
      rules: {
          // 用户名称
          roleName:[
            {validator: checkName, trigger: 'blur'} ],
      },
      menuIdList:[]
    };
  },
 created(){
   this.getUser()
   this.getMenuTr()
 },
 methods:{
    getCheckedKeys() {
        // 这是选中的menuid
        var menuid = this.$refs.tree.getCheckedKeys()
        // 这是选中的半选中的menuid
        var menuid1 = this.$refs.tree.getHalfCheckedKeys()
        menuid = menuid.concat(menuid1)
        this.menuIdList = menuid;
      },
    handleClick(tab, event) {
      if(tab.label == "用户列表"){
        this.oilType = "添加用户";
        this.ruleForm ={}
        this.getUser()
      }
    },
    // 获取用户列表
    getUser(e){
      var jsons = {};
      getUserList({
        page:this.currentPage,
        limit:this.pageSize
      }).then(res =>{
        var list = res.page.list;//列表
        var size = res.page.totalCount; //总条数
        var currPage = res.page.currPage;//当前页数
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    // 处理权限列表文件
    getMenuTr(){
      stores.getMenuTrees().then(res=>{
        let obj = {}
        this.data = res
      })
    },
    // 修改部门信息
    updata(index,row){
      this.ruleForm = row;
      // console.log(this.ruleForm)
      this.activeName = "addList"
      this.oilType = "修改用户"
      this.imageUrl = "http://you.yunfeiyang.com"+row.logo
    },
    // 提交
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.getCheckedKeys();
        this.ruleForm.menuIdList = this.menuIdList;
        setUserInfo(this.ruleForm).then(res =>{
          if(res.code==0){
            this.activeName = "OliList"
            this.oilType = "添加用户"
            this.ruleForm ={}
            this.data = []
          }
        })
      },
    reback() {
      this.activeName = "OliList"
      this.oilType = "添加用户"
      this.ruleForm ={}
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getUser();
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getUser();
    },
    
    // 查询用户
    searchDepart(){

    },
 },
 mounted(){},
 computed:{},
}
</script>
<style scoped>
.l-display{
    display: flex;
    align-items: center;
    margin: 8px 0;

  }
  .l-quanxian>div{
    width: 30%;
    margin: 0 auto;
  }
</style>