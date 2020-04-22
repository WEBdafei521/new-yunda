<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="油品列表" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">石油公司</h5>
              <el-select v-model="orgCodeValue" clearable @change="selectCompany" placeholder="请选择">
                <el-option
                  v-for="item in companyOptions"
                  
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <h5 style="color:#000;margin:0 10px;">加油站</h5>
              <el-select v-model="orgCodeValue1" clearable placeholder="请选择">
                <el-option
                  v-for="item in stationOptions"
                  
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <h5 style="color:#000;margin:0 10px;">油品名</h5>
              <el-input v-model="goodsName" style="width:200px;"></el-input>
              <h5 style="color:#000;margin:0 10px;">油品代码</h5>
              <el-input v-model="goodsCode" style="width:200px;"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="deptName"
                  label="石油公司/加油站"
                  max-width="60">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="goodsName"
                  label="油品名"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="goodsCode"
                  label="油品代码"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="price"
                  label="单价(元/L)"
                  max-width="150">
                </el-table-column>

                <el-table-column
                  className="animated slideInRight  delay-1s"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="updataPrice(scope.$index, scope.row)">调价</el-button>
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
                    <h5 style="color:#000;margin:0 10px;">油品</h5>
                    <el-input disabled v-model="oilTypeName" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 style="color:#000;margin:0 10px;">当前油价<span>(元/升)</span></h5>
                    <el-input disabled v-model="oldPrice" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 style="color:#000;margin:0 10px;">新油价 <span>(元/升)</span></h5>
                    <el-input v-model="newPrice" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 style="color:#000;margin:0 10px;">选择油枪 </h5>
                    <el-select v-model="gunValue" multiple placeholder="请选择">
                      <el-option
                        v-for="item in gunOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
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

          <el-tab-pane label="添加油品" name="addList">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!-- 油品分类 -->
              <el-form-item label="油品分类" prop="abbreviate" class="animated slideInRight  delay-.1s">
                <div class="block">
                        <el-cascader
                        style="width:100%;"
                          size="medium"
                          @change="selectOilType"
                          :options="optionsP"
                          :props="{ checkStrictly: true,defaultParams }"
                          clearable></el-cascader>
                      </div>
              </el-form-item>
              <!-- 油品代码 -->
              <el-form-item  label="油品代码" prop="goodsCode" class="animated slideInRight  delay-.1s">
                <el-input disabled v-model="ruleForm.goodsCode"></el-input>
              </el-form-item>
              <!-- 油品名(L) -->
              <el-form-item label="油品名" prop="goodsName" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.goodsName"></el-input>
              </el-form-item>
              <!-- 简称 -->
              <el-form-item label="简称" prop="abbreviate" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.abbreviate"></el-input>
              </el-form-item>
              <!-- 单价 -->
              <el-form-item label="单价" prop="price" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.price"></el-input>
              </el-form-item>
              <!-- 油品详情 -->
              <el-form-item label="油品详情" prop="goodsDetails" class="animated slideInRight  delay-.1s">
                <el-input type="textarea" v-model="ruleForm.goodsDetails"></el-input>
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
import {getOilList,delOilType,saveOilType,getGun,updataPrice} from '../../../api/goods/index';

import * as stores from '../../../store/methods'
export default {
  data () {
    var checkPrice = (rule, value, callback) => {
      var isMoney = stores.testMoney(value)
        if (!isMoney) {
          return callback(new Error('请输入正确的油价'));
        }
      };
    return {
      activeName: 'OliList',
      dialogVisible:false,
      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],
      ruleForm: {
        abbreviate:"",
        goodsCode:"",
        goodsName:"",
        price:"",
        goodsDetails:"",
        id:"",
      },
      rules: {
          abbreviate: [
            { required: true, message: '请输入选择油品', trigger: 'blur' }
          ],
          price: [  {validator: checkPrice, trigger: 'blur'} ],
      },
      companyOptions:[],
      orgCodeValue:"",
      orgCodeValue1:"",
      stationOptions:[],
      goodsCode:"",
      goodsName:"",
      gunOptions: [],
      // 选择调价油品
      gunValue: [],
      oilTypeName:"",
      oldPrice:"",
      newPrice:"",
      id:"",
      // 选择油品类型
      optionsP:[],
      defaultParams: {
         label: 'name',
         value: 'id',
         children: 'children'
      },
    };
  },
  created(){
    this.getOilLists()
    this.getOilTypeList()
    stores.getDepartLists().then(res => {
      var company = res[0].children
      company.forEach(item=>{
        item.value = item.orgCode
        item.label =item.departname
      })
      this.companyOptions = company
    })
  },
  components: {},

  computed: {},


  methods: {
    getOilTypeList(){
      stores.setCarRule().then(res=>{
        this.optionsP = res
      })
    },
    selectCompany(e){
      var station = []
      for(var item of this.companyOptions){
        if(e==item.orgCode){
          for(var items of item.children){
            items.value = items.orgCode
            items.label = items.departname
            station.push(items)
          }
        }
      }
      this.stationOptions = station
    },
    // 选择油品
    selectOilType(e){
      var row ={}
      var index = e.length-1
      for(var item of this.optionsP){
        if(e[index] == item.value){
          row = item
        }
        for(var items of item.children){
          if(e[index] == items.value){
            row = items
          }
        }
      }
      this.ruleForm.goodsCode = row.value
      this.ruleForm.goodsName = row.oilName
      this.ruleForm.abbreviate = row.abbreviate
      this.ruleForm.id = row.id;
    },
    // 查询油站列表
    searchDepart(){
      this.getOilLists()
    },
    // 提交
    submitForm(formName) {
      console.log(this.$refs[formName].validate)
      this.$refs[formName].validate((valid) => {
          if (valid) {
              saveOilType(this.ruleForm).then(res =>{
                  if(res.code==0){
                    this.activeName="OliList"
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.ruleForm={
                      abbreviate:"",
                      goodsCode:"",
                      goodsName:"",
                      price:"",
                      goodsDetails:"",
                      id:"",
                    }
                  }else{
                    this.$message({
                      type: 'info',
                      message: res.msg
                    });
                  }
              })
          } else {
            return false;
          }
        });
        // if()
        console.log("----")
        
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 调价
    updataPrice(index,row){
      this.oilTypeName = row.goodsName
      this.oldPrice = row.price
      this.id = row.id
      getGun(row.id).then(res =>{
        var gunLists = res.guns;
        gunLists.forEach((item,index)=>{
          item.value = item.id
          item.label = "枪号"+item.gunNo + "  当前价格" +item.price
        })
      this.gunOptions = gunLists
      })
      this.dialogVisible=true
    },
    tiaojia(){
      var obj={
        goodsName:this.oilTypeName,
        gunIds:this.gunValue.toString(),
        id:this.id,
        newPrice:this.newPrice,
        price:this.oldPrice,
      }

      var price = stores.testMoney(this.newPrice)
      if(!price){
        this.$message({
                      type: 'info',
                      message: '请输入正确的价格!'
                    });
                    return
      }
      if(!this.gunValue){
        this.$message({
                      type: 'info',
                      message: '请选择油枪!'
                    });
                    return
      }
      updataPrice(obj).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$message({
                      type: 'info',
                      message:res.msg
                    });
                    this.oilTypeName = ""
                    this.gunValue = ""
                    this.id = ""
                    this.newPrice = ""
                    this.oldPrice = ""
                    this.dialogVisible=false
        }
        
      })
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
            delOilType(id).then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.getOilLists();
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
    getOilLists(e){
      getOilList({
        page:this.currentPage,
        limit:this.pageSize,
        orgCode:this.orgCodeValue?this.orgCodeValue:this.orgCodeValue1,
        goodsCode:this.goodsCode,
        goodsName:this.goodsName,
      }).then(res =>{
        // console.log(res)
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
      if(tab.label == "加油列表"){
          this.ruleForm={
                    lpn:"",
                    username:"",
                    oilCode:"",
                    confinQty:"",
                    frequency:""
                }
        this.getOilLists()
      }
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.getOilLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.getOilLists();
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