<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="标签列表" name="OliList"> 
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
                  prop="price"
                  label="挂牌价格(￥)"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="tagPrice"
                  label="标签价格(￥)"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="goodsName"
                  label="油品名称"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="abbreviate"
                  label="油品简称"
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
              <!-- 标签名 -->
              <el-form-item label="标签名" prop="tagId" class="animated slideInRight  delay-.1s">
                 <el-select style="width:100%;" v-model="ruleForm.tagId" clearable placeholder="请选择">
                  <el-option
                    v-for="item in optionsLabel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 选择油品(L) -->
              <el-form-item label="选择油品" prop="goodId" class="animated slideInRight  delay-.1s">
                <el-select style="width:100%;" v-model="ruleForm.goodId" placeholder="请选择">
                  <el-option
                    v-for="item in oilTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">￥{{ item.price }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 标签价格(¥)(L) -->
              <el-form-item label="标签价格(¥)" prop="tagPrice" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.tagPrice"></el-input>
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
import {getLabelList,delLabel,saveLabel,getGun,updataPrice,getOilTypeList,savePiPei } from '../../../api/goods/index';

import * as stores from '../../../store/methods'
export default {
  data () {
     var checkPrice = (rule, value, callback) => {
       var price = stores.testMoney(value);
        if (!price) {
          return callback(new Error('请输入正确的价格'));
        }
      };
    return {
      activeName: 'OliList',
      oilType:"添加",
      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],
      ruleForm: {
        tagId:"",
        goodId:"",
        tagPrice:"",
      },
      rules: {
          tagId: [
            { required: true, message: '请选择标签名', trigger: 'blur' }
          ],
          goodId: [
            { required: true, message: '请选择油品', trigger: 'blur' }
          ],
          tagPrice: [
            {validator: checkPrice, trigger: 'blur'}
          ],
      },
      id:"",
      optionsLabel: [],
      value: '',
      oilTypes: [],
      
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
          _this.activeName = "OliList";
          savePiPei(this.ruleForm).then(res =>{
                  if(res.code==0){
                    
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
    // 获取列表
    getLabelLists(e){
      // 获取已经匹配的
      getLabelList({
        page:this.currentPage,
        limit:this.pageSize,
        type:1,
        id:this.id,
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      });
      // 获取标签列表 用户添加修改
      getLabelList({
        page:1,
        limit:200,
      }).then(res =>{
        var labelList = res.page.list
        labelList.forEach((item,index) => {
          item.value = item.id
          item.label = item.tagName
        })
        this.optionsLabel = labelList
        // console.log(res)
      });
      // 获取油品列表
      getOilTypeList().then(res => {
        // console.log(res)
        var oilTypeList = res.list
        oilTypeList.forEach((item,index)=>{
          console.log(item)
          item.label=item.goodsName
          item.value=item.id
        })
        this.oilTypes = oilTypeList
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