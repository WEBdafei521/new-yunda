<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="油罐列表" name="OliList" class=""> 
            <div class="l-display">
           
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="deptName"
                  label="所属油站"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="controllerNo"
                  label="智能控制器编号"
                  max-width="60">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="controlType"
                  label="控制器类型"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="status1"
                  label="状态"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="updateTime"
                  label="更新时间"
                  max-width="100">
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
              <!-- 智能控制器编号 -->
              <el-form-item label="智能控制器编号" prop="controllerNo" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.controllerNo"></el-input>
              </el-form-item>
   
              <!-- 控制器类型 -->
              <el-form-item label="控制器类型" prop="controllerType" class="animated slideInRight  delay-.1s">
                <el-select style="width:100%;" v-model="ruleForm.controllerType" placeholder="请选择">
                  <el-option
                    style="width:100%;"
                    v-for="(item,index) of oilTypeList"
                    :key="index"
                    :label=" item.label"
                    :value="item.label">
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
import {getControlList,saveControl,updataControlInfo} from '../../../api/equipment/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    return {
      oilType:"添加",
      activeName: 'OliList',
      oilTypeList: [
        {
          value:"1",
          label:"油枪智能控制器"
        }
      ],
      // 时间配置
      inputval:"",

      sizeLength:0,
      currentPage:"1",
      pageSize:"10",

      tableData: [],
  
      ruleForm: {
        controllerNo:"",
        controllerType:""
      },
      rules: {
          controllerNo: [
            { required: true, message: '请输入控制器编号', trigger: 'blur' },
            { min: 4, max: 10, message: '请输入4-10位的编号', trigger: 'blur' }
          ],
         
      },  
    };
  },
  created(){
    this.getControlLists()
  },
  components: {},

  computed: {},


  methods: {
    // 选择油品
    selectOil(e){
      var index = e.length-1
      this.ruleForm.oilCode = e[index];

    },
    // 查询油站列表
    searchDepart(){
      this.getControlLists()
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.oilType == "修改"){
              updataControlInfo(this.ruleForm).then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        controllerNo:"",
                        controllerType:""
                    }
                  }
              })
            }else{
              saveControl(this.ruleForm).then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        controllerNo:"",
                        controllerType:""
                       
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
            stores.deleteListItem(id,"equipment/yfyscontroller/delete").then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getControlLists();
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
    getControlLists(e){
      getControlList({
        page:this.currentPage,
        limit:this.pageSize,
        controllerNo:"",
        orgCode:"",
        simNo:"",
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        list.forEach((item,index)=>{
          if(item.controllerType == 1){
            item.controlType = "油枪智能控制器"
          }
        })
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
      if(tab.label == "列表"){
        this.oilType = "添加";
          this.ruleForm={
                   controllerNo:"",
                    controllerType:""
                }
        this.getControlLists()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getControlLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getControlLists();
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