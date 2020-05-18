<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="列表" name="OliList" class=""> 
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
                  prop="protocolType"
                  label="协议"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="number"
                  label="编号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="intro"
                  label="备注"
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
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
              
              <!-- 设备编号 -->
              <el-form-item label="协议类型" prop="protocolType" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.protocolType"></el-input>
              </el-form-item>
              <!-- SIM卡号 -->
              <el-form-item label="编号" prop="number" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.number"></el-input>
              </el-form-item>
              
              
              
              <!-- 低油位 -->
              <el-form-item label="备注" prop="intro" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.intro"></el-input>
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

      tableData: [],
      ruleForm: {
        protocolType:"",
        number:"",
        intro:"",
      },
      rules: {
          purchaseOrderNum: [
            { required: true, message: '请输入进油单号', trigger: 'blur' },
            { min: 5, max: 10, message: '请输入正确的进油单号', trigger: 'blur' }
          ],
      },  
    
    };
  },
  created(){
    this.getOilTankLists()
  
  },
  components: {},

  computed: {},


  methods: {
 
    selectOil(e){
      var index = e.length-1
      this.ruleForm.oilCode = e[index];

    },
 
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.oilType == "修改"){
              stores.updata(this.ruleForm,"potocol/yfyspotocol/update").then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        protocolType:"",
                        number:"",
                        intro:"",
                    }
                  }
              })
            }else{
              stores.add(this.ruleForm,"equipment/yfysequipment/save").then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        protocolType:"",
                        number:"",
                        intro:"",
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
        id:"",
      },"potocol/yfyspotocol/list").then(res => {
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
                    lpn:"",
                    username:"",
                    oilCode:"",
                    confinQty:"",
                    frequency:""
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