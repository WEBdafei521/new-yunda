<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="标签列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">ID</h5>
              <el-input v-model="id" style="width:200px;"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="id"
                  label="Id"
                  max-width="60">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tagName"
                  label="标签名"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="orgCode"
                  label="机构编号"
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
              <!-- 油品代码 -->
              <el-form-item label="油品代码" prop="tagName" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.tagName"></el-input>
              </el-form-item>
              <!-- 油品名(L) -->
              <el-form-item label="油品名" prop="remark" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.remark"></el-input>
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
import {getLabelList,delLabel,saveLabel,getGun,updataPrice} from '../../../api/goods/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    return {
      activeName: 'OliList',
      oilType:"添加",
      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],
      ruleForm: {
        tagName:"",
        remark:""
      },
      rules: {
          tagName: [
            { required: true, message: '请输入标签名', trigger: 'blur' }
          ],
      },
      id:""
    };
  },
  created(){
    this.getLabelLists()
  },
  components: {},

  computed: {},


  methods: {

   
    updata(index,row){
      this.ruleForm = row;
      // console.log(row)
      this.activeName = "addList"
      this.oilType = "修改"
    },
    // 查询油站列表
    searchDepart(){
      this.getLabelLists()
    },
    // 提交
    submitForm(formName) {
      var _this = this;
      var ischecked=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          } else {
            ischecked = false
          }
        });
        if(ischecked){
          saveLabel(this.ruleForm).then(res =>{
                  if(res.code==0){
                    _this.activeName = "OliList";
                    _this.getLabelLists()
                    _this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    _this.ruleForm={
                      tagName:"",
                      remark:""
                    }
                  }else{
                    _this.$message({
                      type: 'info',
                      message: res.msg
                    });
                  } 
              })
        }
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
            delLabel(id).then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getLabelLists();
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
    // 获取油品列表
    getLabelLists(e){
      getLabelList({
        page:this.currentPage,
        limit:this.pageSize,
        type:0,
        id:this.id,
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
      this.activeName = "OliList"
      if(tab.label == "标签列表"){
        this.oilType = "添加";
        this.ruleForm={
                    tagName:"",
                    remark:""
                }
        this.getLabelLists()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getLabelLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getLabelLists();
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
    /* flex-direction: column; */
    align-items: center;
    margin: 16px 0;
  }
  .l-display-cum{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>