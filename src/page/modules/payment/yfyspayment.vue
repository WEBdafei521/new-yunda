<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">商户id</h5>
              <el-input v-model="inputval" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入内容"></el-input>
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
                  prop="appid"
                  label="应用id"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="cusid"
                  label="商户id"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="url"
                  label="URL地址"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="version"
                  label="版本号"
                  max-width="100">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="departName"
                  label="运营商名称"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="orgCode"
                  label="机构编号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  
                  prop="zip"
                  label="状态"
                  max-width="150">
                  <template slot-scope="scope">
                    <span class="label label-danger " style="background:red;padding:6px;color:#fff;font-weight:600;"  v-if="scope.row.status == '0' " >禁用</span>
                    <span class="label label-success" style="background:green;padding:6px;color:#fff;font-weight:600;" v-else>正常</span>
                  </template>
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
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
              
              <!-- 应用id -->
              <el-form-item label="应用id" prop="appid" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.appid"></el-input>
              </el-form-item>
              <!-- 商户id -->
              <el-form-item label="商户id" prop="cusid" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.cusid"></el-input>
              </el-form-item>
              <!-- 秘钥 -->
              <el-form-item label="秘钥" prop="secretKey" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.secretKey"></el-input>
              </el-form-item>
              
              <!-- URL地址 -->
              <el-form-item label="URL地址" prop="url" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.url"></el-input>
              </el-form-item>
              <!-- 版本号 -->
              <el-form-item label="版本号" prop="version" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.version"></el-input>
              </el-form-item>
              <!-- 设备类型 -->
              <el-form-item label="运营商名称" prop="orgCode" class="animated slideInRight  delay-.1s">
                <el-select style="width:100%;" v-model="ruleForm.orgCode" placeholder="请选择">
                  <el-option
                    style="width:100%;"
                    v-for="(item,index) of liquidLevelMeterId"
                    :key="index"
                    :label=" item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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

import * as stores from '../../../store/methods'
export default {
  data () {
    return {
      oilType:"添加",
      activeName: 'OliList',

      sizeLength:0,
      currentPage:"1",
      pageSize:"10",

      inputval:"",
      tableData: [],
      liquidLevelMeterId:[ ],
      ruleForm: {
        appid:"",
        cusid:"",
        secretKey:"",
        url:"",
        version:"",
        orgCode:"",
        
      },
      rules: {
          appid: [
            { required: true, message: '请输入应用id', trigger: 'blur' },
          ],
      },  

    };
  },
  created(){
    this.getOilTankLists()
    this.getCusList()
  },
  components: {},

  computed: {},


  methods: {
    searchDepart(){
      this.getOilTankLists(this.inputval)
    },
    selectOil(e){
      var index = e.length-1
      this.ruleForm.oilCode = e[index];

    },
    // 获取运营商名称
    getCusList(){
      stores.getList({},"payment/yfyspayment/getOperators").then(res => {
        console.log(res)
        var arr = []
        for(var item of res.list){
          var obj ={}
          obj.label = item.departname
          obj.value = item.orgCode
          arr.push(obj)
        }
        this.liquidLevelMeterId = arr
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.oilType == "修改"){
              stores.updata(this.ruleForm,"equipment/yfysequipment/update").then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        appid:"",
                        cusid:"",
                        secretKey:"",
                        url:"",
                        version:"",
                        orgCode:"",
                    }
                  }
              })
            }else{
              stores.add(this.ruleForm,"payment/yfyspayment/save").then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        appid:"",
                        cusid:"",
                        secretKey:"",
                        url:"",
                        version:"",
                        orgCode:"",
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
            stores.deleteListItem(id,"equipment/yfysequipment/delete").then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getOilTankLists();
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
    getOilTankLists(e){
      stores.getList({
        page:this.currentPage,
        limit:this.pageSize,
        appid:e,
      },"payment/yfyspayment/list").then(res => {
        console.log(res)
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
                    appid:"",
                    cusid:"",
                    secretKey:"",
                    url:"",
                    version:"",
                    orgCode:"",
                }
        this.getOilTankLists()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getOilTankLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getOilTankLists();
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