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
                  prop="equipmentType"
                  label="设备类型"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="equipmentNumber"
                  label="设备编号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="simNumber"
                  label="SIM卡号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="simEndtime"
                  label="SIM卡到期时间"
                  max-width="100">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="departname"
                  label="部门名称"
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
              <!-- 设备类型 -->
              <el-form-item label="设备类型" prop="equipmentType" class="animated slideInRight  delay-.1s">
                <el-select style="width:100%;" v-model="ruleForm.equipmentType" placeholder="请选择">
                  <el-option
                    style="width:100%;"
                    v-for="(item,index) of liquidLevelMeterId"
                    :key="index"
                    :label=" item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 设备编号 -->
              <el-form-item label="设备编号" prop="equipmentNumber" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.equipmentNumber"></el-input>
              </el-form-item>
              <!-- SIM卡号 -->
              <el-form-item label="SIM卡号" prop="simNumber" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.simNumber"></el-input>
              </el-form-item>
              <!-- SIM卡到期时间 -->
              <el-form-item label="SIM卡到期时间" prop="simEndtime" class="animated slideInRight  delay-.1s">
                <el-date-picker
                  style="width:100%"
                  v-model="ruleForm.simEndtime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              
              <!-- 石油公司/加油站 -->
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
              <!-- 低油位 -->
              <el-form-item label="备注" prop="comment" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.comment"></el-input>
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
      liquidLevelMeterId:[
        {
          value:"油枪智能控制器",
          label:"油枪智能控制器"
        },
        {
          value:"液位控制器",
          label:"液位控制器"
        },
      ],
      ruleForm: {
        equipmentNumber:"",
        simNumber:"",
        simEndtime:"",
        orgCode:"",
        comment:"",
        equipmentType:""
      },
      rules: {
          purchaseOrderNum: [
            { required: true, message: '请输入进油单号', trigger: 'blur' },
            { min: 5, max: 10, message: '请输入正确的进油单号', trigger: 'blur' }
          ],
      },  
      optionsP: [],//部门列表
      defaultParams: {
         label: 'name',
         value: 'id',
         children: 'children'
      },
    };
  },
  created(){
    this.getOilTankLists()
    // 获取部门列表
    stores.getDepartLists().then(res =>{
      this.optionsP = res;
    })
  },
  components: {},

  computed: {},


  methods: {
    // 选择油站
    selectDepart(e){
      var index = e.length-1
      this.ruleForm.orgCode = e[index];
    },
    selectOil(e){
      var index = e.length-1
      this.ruleForm.oilCode = e[index];

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
                        equipmentNumber:"",
                        simNumber:"",
                        simEndtime:"",
                        orgCode:"",
                        comment:"",
                        equipmentType:""
                    }
                  }
              })
            }else{
              this.ruleForm.simEndtime  = this.ruleForm.simEndtime +" 00:00:00"
              stores.add(this.ruleForm,"equipment/yfysequipment/save").then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        equipmentNumber:"",
                        simNumber:"",
                        simEndtime:"",
                        orgCode:"",
                        comment:"",
                        equipmentType:""
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
      },"equipment/yfysequipment/list").then(res => {
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