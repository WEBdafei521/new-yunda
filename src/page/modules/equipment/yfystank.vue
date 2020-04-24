<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="油罐列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">罐号编号</h5>
              <el-input v-model="inputval" style="width:200px;"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tankNo"
                  label="罐号"
                  max-width="60">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="deptName"
                  label="所属油站"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="goodsName"
                  label="油品"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tankHeight"
                  label="罐高"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tankMaxCapacity"
                  label="最大罐容"
                  max-width="100">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tankCapacityPercentage"
                  label="罐容率"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="liquidLevelMeterNo"
                  label="液位控制器编号"
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
              <!-- 罐号 -->
              <el-form-item label="罐号" prop="tankNo" class="animated slideInRight  delay-.1s">
                <el-input disabled v-model="ruleForm.tankNo"></el-input>
              </el-form-item>
              <!-- 灌高 -->
              <el-form-item label="灌高 (CM)" prop="tankHeight" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.tankHeight"></el-input>
              </el-form-item>
              <!-- 油品 -->
              <el-form-item label="油品" prop="goodsId" class="animated slideInRight  delay-.1s">
                <el-select style="width:100%;" v-model="ruleForm.goodsId" placeholder="请选择">
                  <el-option
                    style="width:100%;"
                    v-for="(item,index) of oilTypeList"
                    :key="index"
                    :label=" item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 液位仪编号 -->
              <el-form-item label="液位仪编号" prop="liquidLevelMeterId" class="animated slideInRight  delay-.1s">
                <el-select style="width:100%;" v-model="ruleForm.liquidLevelMeterId" placeholder="请选择">
                  <el-option
                    style="width:100%;"
                    v-for="(item,index) of liquidLevelMeterId"
                    :key="index"
                    :label=" item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 高油位(L) -->
              <el-form-item label="高油位 (L)" prop="highOilLevel" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.highOilLevel"></el-input>
              </el-form-item>
              <!-- 低油位 -->
              <el-form-item label="低油位 (L)" prop="lowOilLevel" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.lowOilLevel"></el-input>
              </el-form-item>
              <!-- 最大罐容 -->
              <el-form-item label="最大罐容 (L)" prop="tankMaxCapacity" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.tankMaxCapacity"></el-input>
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
import {getOilTankList,delOilTank,getOilTypeList,saveOilStankInfo,updataOilStankInfo} from '../../../api/equipment/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    return {
      oilType:"添加",
      activeName: 'OliList',
      oilTypeList: [],
      // 时间配置
      inputval:"",

      sizeLength:0,
      currentPage:"1",
      pageSize:"10",

      tableData: [],
      liquidLevelMeterId:[
        {
          value:"0",
          label:"不使用液位控制器"
        },
        {
          value:"1",
          label:"使用液位控制器"
        },
      ],
      ruleForm: {
        tankNo:"",
        tankHeight:"",
        goodsId:"",
        highOilLevel:"",
        lowOilLevel:"",
        tankMaxCapacity:"",
        liquidLevelMeterId:""
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
    // // 选择油品
    // selectTank(e){ 
    //   this.unloadOiltankid = e
    // },
    // 选择油品
    selectOil(e){
      var index = e.length-1
      this.ruleForm.oilCode = e[index];

    },
    // 查询油站列表
    searchDepart(){
      this.getOilTankLists()
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.oilType == "修改"){
              updataOilStankInfo(this.ruleForm).then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        tankNo:"",
                        tankHeight:"",
                        goodsId:"",
                        highOilLevel:"",
                        lowOilLevel:"",
                        tankMaxCapacity:"",
                        liquidLevelMeterId:""
                    }
                  }
              })
            }else{
              saveOilStankInfo(this.ruleForm).then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        tankNo:"",
                        tankHeight:"",
                        goodsId:"",
                        highOilLevel:"",
                        lowOilLevel:"",
                        tankMaxCapacity:"",
                        liquidLevelMeterId:""
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
            delOilTank(id).then(r =>{
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
      getOilTankList({
        page:this.currentPage,
        limit:this.pageSize,
        goodsId:"",
        tankNo:this.inputval,
        orgCode:"",
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
      // 获取油品信息
      getOilTypeList().then(res => {
        // var oilTypeList;
        var oilList = res.data.goods
        oilList.forEach((item,index) => {
          item.value = item.id
          item.label = item.goodsName?item.goodsName:item.id
        })
        this.ruleForm.tankNo = res.data.tankNo
        this.oilTypeList =oilList
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