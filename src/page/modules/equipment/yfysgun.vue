<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          
          <el-tab-pane label="油枪列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">枪号</h5>
              <el-input v-model="inputValue" style="width:200px;"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="deptName"
                  label="所属油站"
                  width="130">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="gunNo"
                  label="枪号"
                  width="80">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="controllerNo"
                  label="智能控制器编号"
                  width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tankNo"
                  label="罐号"
                  width="80">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="price"
                  label="单价"
                  width="80">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="goodsName"
                  label="油品"
                  width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="protocolType"
                  label="协议类型"
                  width="100">
                </el-table-column>

              
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  label="操作"
                  width="400">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="updataPrice(scope.$index, scope.row)">调价</el-button>
                    <el-button type="primary" @click="setPeizhis(scope.$index, scope.row)">下发配置</el-button> 
                    <el-button type="primary" @click="updata(scope.$index, scope.row)">修改</el-button> 
                    <el-button type="danger" @click="delStatusRow(scope.$index, scope.row)">删除</el-button> 
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="油品调价"
                append-to-body
                :visible.sync="dialogVisible"
                width="40%">
                <div class="l-display-cum">
                  
                  <div class="l-display-item">
                    <h5 class="l-display-item" style="color:#000;">油枪号</h5>
                    <el-input disabled v-model="updataPrices.gunNo" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 class="l-display-item" style="color:#000;">原始单价<span>(元/升)</span></h5>
                    <el-input disabled v-model="updataPrices.oldPrice" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 class="l-display-item" style="color:#000;">新价格 <span>(元/升)</span></h5>
                    <el-input v-model="updataPrices.newPrice" style="width:200px;"></el-input>
                  </div>
                </div>
                

                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="tiaojia">确 定</el-button>
                </span>
              </el-dialog>
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
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
              <!-- 枪号 -->
              <el-form-item label="枪号" prop="gunNo" class="animated slideInRight  delay-.1s">
                <el-input disabled v-model="ruleForm.gunNo"></el-input>
              </el-form-item>
              <!-- 智能控制 -->
              <el-form-item  label="智能控制" prop="controllerNo" class="animated slideInRight  delay-.1s">
                <el-select v-model="ruleForm.controllerNo" placeholder="请选择" style="width: 300px;" @change="controllerSelect"> 
                  <el-option v-for="item in controllerOptions" :key="item.id" :label="item.controllerNo" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <!-- 罐号(L) -->
              <el-form-item label="罐号" prop="tankNo" class="animated slideInRight  delay-.1s">
                <el-select v-model="ruleForm.tankNo" placeholder="请选择" style="width: 300px;" @change="tankSelect">
                  <el-option v-for="item in tankList" :key="item.id" :label="item.tankNo" :value="item">
                    <span style="float: left">罐号:{{item.tankNo}}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{item.goodsName}}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 油品名 -->
              <el-form-item label="油品名" prop="goodsName" class="animated slideInRight  delay-.1s">
                <el-input disabled v-model="ruleForm.goodsName"></el-input>
              </el-form-item>
              <!-- 协议 -->
              <el-form-item label="协议" prop="typeNumber" class="animated slideInRight  delay-.1s">
                <el-select v-model="ruleForm.typeNumber" placeholder="请选择" style="width: 300px;" @change="numberSelect">
                  <el-option v-for="item in numberOptions" :key="item.number" :label="item.protocolType"  :value="item">
                    <span style="float: left">编号:{{item.number}}</span>
                    <span style="float: right"> {{item.protocolType}}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <!-- 工作模式 -->
              <el-form-item label="工作模式" prop="workMode" class="animated slideInRight  delay-.1s">
                <el-select v-model="ruleForm.workMode" placeholder="请选择" style="width: 300px;">
                  <el-option v-for="item in workModeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <!-- GPS上传模式 -->
              <el-form-item label="GPS上传模式" prop="gpsUpload" class="animated slideInRight  delay-.1s">
                <el-select v-model="ruleForm.gpsUpload" placeholder="请选择" style="width: 300px;" @change="GPSSelect">
                  <el-option v-for="item in GPSUploadOptions" :key="item.number" :label="item.label"  :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 上传GPS数据时间间隔 -->
              <el-form-item label="上传GPS数据时间间隔(秒)" prop="gpsUploadTime" class="animated slideInRight  delay-.1s" v-show="ruleForm.gpsStatusFlag">
                <el-input v-model="ruleForm.gpsUploadTime"></el-input>
              </el-form-item>
              <!-- 是否上传实时数据 -->
              <el-form-item label="是否上传实时数据" prop="statusUpload" class="animated slideInRight  delay-.1s">
                <el-select v-model="ruleForm.statusUpload" placeholder="请选择" style="width: 300px;" @change="ModelSelect">
                  <el-option v-for="item in modelOptions" :key="item.value" :label="item.label"  :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 上传实时数据时间间隔(L) -->
              <el-form-item label="上传实时数据时间间隔(秒)" prop="statusUploadTime" class="animated slideInRight  delay-.1s" v-show="ruleForm.statusFlag">
                <el-input v-model.number="ruleForm.statusUploadTime"></el-input>
              </el-form-item>
              <el-form-item label="M1卡扇区号" prop="sector" label-width="200px"  v-show="false">
                <el-input v-model="ruleForm.sector" style="width: 300px;"></el-input>
              </el-form-item>
              <el-form-item label="白名单版本号" prop="WList" label-width="200px"  v-show="false">
                <el-input v-model="ruleForm.WList" style="width: 300px;"></el-input>
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
import {updataPrice,setPeizhi,getOilGunInfo} from '../../../api/equipment/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    
    return {
      oilType:"添加",
      activeName: 'OliList',
      inputValue:"",
      dialogVisible:false,
      
      // 调价数据
      updataPrices:{
        gunNo:"",
        oldPrice:"",
        newPrice:"",
        controllerNo:"",
        id:"",
      },
      // 协议
      numberList:[],
      // 罐列表
      tankList:[],
      // 智能控制器 列表
      controllerOptions:[],
      // 协议
      numberOptions:[],
      // 工作模式
      workModeOptions:[
        {
          value:'00',
          label:"启用"
        },
        {
          value:'01',
          label:"停用"
        },
      ],
      // GPS上传模式
      GPSUploadOptions:[
        {
          value:'00',
          label:"不主动上传"
        },
        {
          value:'01',
          label:"主动上传"
        }
      ],
      modelOptions:[
        {
          value:'00',
          label:"不实时上传"
        },
        {
          value:'01',
          label:"实时上传"
        }
      ],

      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],

      ruleForm: {
        statusFlag:true,
        gpsStatusFlag:true,
        gunNo:"",
        controllerNo:"",
        tankNo:"",
        goodsName:"",
        typeNumber:"",
        gpsUpload:"01",
        statusUpload:"01",

        gpsUploadTime:60,
        statusUploadTime:30,

        sector:"0B",
        workMode:"00",
        WList:"00",
      },
      rules: {
          controllerNo: [
            { required: true, message: '请选择只能控制器', trigger: 'blur' },
          ],
          tankNo: [
            { required: true, message: '请选择智能控制器', trigger: 'blur' }
          ],
          typeNumber: [
            { required: true, message: '请选择协议', trigger: 'blur' },
          ],
      },  
    };
  },
  created(){
    this.getList()
    
  },
  components: {},

  computed: {},


  methods: {
    GPSSelect(e){
      if(e=="00"){
        this.ruleForm.gpsStatusFlag = false
      }else{
        this.ruleForm.gpsStatusFlag = true
      }
    },
    ModelSelect(e){
      if(e=="00"){
        this.ruleForm.statusFlag = false
      }else{
        this.ruleForm.statusFlag = true
      }
    },
    // 油罐选择
    tankSelect(e){
      this.ruleForm.price = e.price
			this.ruleForm.tankNo = e.tankNo
      this.ruleForm.goodsName = e.goodsName
      this.ruleForm.tankId = e.id
    },
    // 选择智能控制器
    controllerSelect(val){
			this.ruleForm.controllerId = val.id
			this.ruleForm.controllerNo = val.controllerNo
    },
    // 选择协议
    numberSelect(val){
        this.ruleForm.typeNumber = val.number
    },
    addInfo(){
      getOilGunInfo().then(res => {
        this.tankList = res.data.tankList
        this.numberOptions = res.data.numberList
        this.ruleForm.gunNo = res.data.gunNo
        this.controllerOptions = res.data.controllerList
        
      })
    },
    // 调价
    updataPrice(index,row){
      this.dialogVisible = true
      this.updataPrices.gunNo = row.gunNo
      this.updataPrices.oldPrice = row.price
      this.updataPrices.controllerNo = row.controllerNo
      this.updataPrices.id = row.id
    },
    // 下发配置
    setPeizhis(index,row){
      setPeizhi(row).then(res => {
        if(res.code == 0){
          this.$message({
                      type: 'success',
                      message: '操作成功!'
                    });
        }else{
          this.$message({
                      type: 'info',
                      message: res.msg
                    });
        }
      })
    },
 
    searchDepart(){
      this.getList()
    },
    tiaojia(){
      this.dialogVisible = false
       var isMoney = stores.testMoney(this.updataPrices.newPrice)
        if (!isMoney || this.updataPrices.newPrice=="") {
          this.$message({
                      type: 'danger',
                      message: '请输入正确的价格!'
                    });
                    this.updataPrices.newPrice = ""
                    return
        }else{
          updataPrice(this.updataPrices).then(res => {
            if(res.code == 0){
              this.$message({
                          type: 'success',
                          message: '操作成功!'
                        });
            }else{
              this.$message({
                          type: 'info',
                          message: res.msg
                        });
            }
          })
        }
    },
    // 提交
    submitForm(formName) {
      // console.log(this.ruleForm)
      // return
      var ischecked=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
              
          } else {
            ischecked = false
          }
        });
        if(ischecked){
          if(this.oilType == "修改"){
              stores.updata(this.ruleForm,"equipment/yfysgun/update").then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        statusFlag:true,
                        gpsStatusFlag:true,
                        gunNo:"",
                        controllerNo:"",
                        tankNo:"",
                        goodsName:"",
                        typeNumber:"",
                        gpsUpload:"01",
                        statusUpload:"01",

                        gpsUploadTime:60,
                        statusUploadTime:30,

                        sector:"0B",
                        id:"",
                        workMode:"00",
                        WList:"00",
                    }
                  }
              })
            }else{
              stores.add(this.ruleForm,"equipment/yfysgun/save").then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.oilType = "添加"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                        statusFlag:true,
                        gpsStatusFlag:true,
                        gunNo:"",
                        controllerNo:"",
                        tankNo:"",
                        goodsName:"",
                        typeNumber:"",
                        gpsUpload:"01",
                        statusUpload:"01",

                        gpsUploadTime:60,
                        statusUploadTime:30,

                        sector:"0B",
                        id:"",
                        workMode:"00",
                        WList:"00",
                    }
                  }
              })
            }
        }
    
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改部门信息
    updata(index,row){
      this.addInfo()
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
            stores.deleteListItem(id,"equipment/yfysgun/delete").then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getList();
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
    getList(e){
      stores.getList({
        page:this.currentPage,
        limit:this.pageSize,
        orgCode:"",
        gunNo:this.inputValue,
        tankNo:"",
        controllerNo:"",
      },"equipment/yfysgun/list").then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },


    handleClick(tab, event) {
      this.addInfo()
      if(tab.label == "油枪列表"){
        this.oilType = "添加";
          this.ruleForm={
                    lpn:"",
                    username:"",
                    oilCode:"",
                    confinQty:"",
                    frequency:""
                }
        this.getList()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getList();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getList();
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
    align-items: center;
  }
  .l-display-cum{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>