<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="加油站列表" name="OliList" class=""> 
            <div class="my_display">
              <h5 style="color:#000;margin:0 10px;">油站名称</h5>
              <el-input v-model="departname" style="width:220px;height:40px;margin:0 10px;" clearable placeholder="请输入内容"></el-input>
              <el-button type="primary" @click="searchBtn" style="height:40px;line-height:0px;">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="e3"
                  label="油站编号"
                  width="150">
                </el-table-column>
                 <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="orgCode"
                  label="机构编号"
                  width="200">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="departname"
                  label="加油站名称"
                  width="250">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="attn"
                  label="联系人"
                  width="200">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-.1s"
                  prop="mobile"
                  label="手机号"
                  width="200">
                </el-table-column>
                 <el-table-column label="操作" width="250" className="animated slideInRight  delay-.1s">
                   <template slot-scope="scope">
                     <el-button @click="updateInfo(scope.$index, scope.row)" type="primary">修改</el-button>  
                     <el-button v-if="scope.row.status == '1' " type="success" @click="updateStatusRow(scope.$index, scope.row)">停用</el-button>  
                     <el-button v-if="scope.row.status == '0' " type="danger" @click="updateStatusRow(scope.$index, scope.row)">启用</el-button>  
                   </template>
                    
                 </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="7"
                layout="total, sizes, prev, pager, next, jumper"
                :total="sizeLength">
              </el-pagination>
            </div>
            
          </el-tab-pane>
          <el-tab-pane :label="addOilType" name="addList">
            

            
              <div class="">
                <el-col :span="24">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="油站编号" prop="e3" class="animated slideInRight  delay-.1s">
                      <el-input disabled v-model="ruleForm.e3"></el-input>
                    </el-form-item>
                    <el-form-item label="油站名称" prop="departname" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.departname"></el-input>
                    </el-form-item>

                    <el-form-item label="简称" prop="deptabbr" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.deptabbr"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="联系人" prop="attn" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.attn"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile" class="animated slideInRight  delay-.1s">
                      <el-input type="number" v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间" prop="openTime" class="animated slideInRight  delay-.1s">
                      <el-time-select
                        placeholder="起始时间"
                        v-model="startTime"
                        :picker-options="{
                          start: '00:30',
                          step: '00:15',
                          end: '24:00'
                        }">
                      </el-time-select>
                      <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        :picker-options="{
                          start: '00:30',
                          step: '00:15',
                          end: '24:00',
                          minTime: startTime
                        }">
                      </el-time-select>
                    </el-form-item>
                    <el-form-item label="服务到期时间" required class="animated slideInRight  delay-.1s">
                      <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" @change="selectTime" v-model="ruleForm.servicedate" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="省" prop="province" class="animated slideInRight  delay-.1s">
                      <!-- <el-input v-model="ruleForm.e1"></el-input> -->
                      <el-select v-model="ruleForm.e1" @change="selectPro" placeholder="请选择">
                        <el-option
                          v-for="item in provinceList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="市" prop="city" class="animated slideInRight  delay-.1s">
                      <!-- <el-input v-model="ruleForm.e2"></el-input> -->
                      <el-select v-model="ruleForm.e2" @change="selectCity" placeholder="请选择">
                        <el-option
                          v-for="item in cityList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="县" prop="xian" class="animated slideInRight  delay-.1s">
                      <!-- <el-input v-model="ruleForm.e4"></el-input> -->
                      <el-select v-model="ruleForm.e4" @change="selectArea" placeholder="请选择">
                        <el-option
                          v-for="item in areaList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="desc" class="animated slideInRight  delay-.1s">
                      <el-input type="textarea" v-model="ruleForm.address"></el-input>
                    </el-form-item>

                    <el-form-item label="logo" prop="logo" class="animated slideInRight  delay-.1s">
                      <el-upload
                        class="avatar-uploader"
                        :action="img.url"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div v-if="!imageUrl"  style="text-align:left;">
                            <div style="margin:5px;width: 80px;height:30px;text-align: center;line-height: 30px;background-color: #e1e1e1;border-radius: 4px;cursor: pointer;border:1px solid #b9b9b9;">上传图片</div>
                          </div>
                      </el-upload>
                      
                    </el-form-item>
                    <el-form-item label="备注" prop="notes" class="animated slideInRight  delay-.1s">
                      <el-input type="textarea" v-model="ruleForm.notes"></el-input>
                    </el-form-item>
                    


                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </div>
            
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import {addOilList, changeStatus,addStation} from '../../../api/request'
import * as stores from '../../../store/methods'
import { Message } from 'element-ui'
export default {
  data () {
    var checkPhone = (rule, value, callback) =>{
      if(value.length !== 11){
         callback(new Error('请输入正确的手机号'));
      }
    }
    return {
      activeName: 'OliList',
      addOilType:"添加",
      sizeLength:50,
      currentPage:1,
      limit:"10",
      departname:"",
      tableData: [],
      ruleForm: {
          e3:'0',
          departname: '',
          deptabbr:'',
          attn:'',
          mobile:'',
          email:'',
          openTime:"08：30-22：30",
          servicedate: '',
          e1:'',
          e2:"",
          e4:'',
          address: '',
          logo:'',
          notes:'',
      },
      rules: {
          departname: [
            { required: true, message: '请输入油站名称', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          deptabbr: [
            { required: true, message: '请输入简称', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          attn: [
            { attn: true, message: '请输入联系人', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
           email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 5, max:50, message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          
          servicedate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          e1: [
            { required: true, message: '请选择省份', trigger: 'blur' },
            { min: 0, max: 16, message: '请选择省份', trigger: 'blur' }
          ],
           e2: [
            { required: true, message: '请选择市', trigger: 'blur' },
            { min: 0, max: 16, message: '请选择市', trigger: 'blur' }
          ],
          e4: [
            { required: true, message: '请选择县', trigger: 'blur' },
            { min: 0, max: 16, message: '请选择县', trigger: 'blur' }
          ],
           address: [
            { required: true, message: '请填写详细信息', trigger: 'blur' },
            { min: 0, max: 50, message: '请填写详细信息', trigger: 'blur' }
          ],
         
          notes: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ],
          
      },
      as:{},
      dialogImageUrl: '',
      dialogVisible: false,
      img:{
        url:""
      },
      imageUrl: '',
      startTime: '',// 营业时间
      endTime: '',
      province:"",// 所选省份
      city:"", //所选市区
      area:"",//所选县镇
      provinceList:[],
      cityList:[],
      areaList:[],
    };
  },

  created(){
    var tokens = this.$store.getters.nowToken
    // 图片上传嫡长子
    this.img.url = "http://you.yunfeiyang.com:8080/yunda/yfysdepart/uploadlogo?token="+tokens;
    // 获取全国省份
    this.provinceList = stores.getProvince();
    // 获取油站的编号
    stores.getStationNum().then(res=>{
      this.ruleForm.e3=res
    })
  },
  
  mounted() {
    this.query()
  },
  methods: {
      //选择省份，并且根据省份查询市区 
      selectPro(e){
        for(var item of this.provinceList){
          if(item.value == e){
            this.province = item.label
          }
        }
        this.cityList = stores.getCity(e)
      },
      selectCity(e){
        for(var item of this.cityList){
          if(item.value == e){
            this.city = item.label
          }
        }
        this.areaList = stores.getArea(e)
      },
      selectArea(e){
        for(var item of this.areaList){
          if(item.value == e){
            this.area = item.label
          }
        }
      },
      // 选着到服务日期 
      selectTime(d){
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.ruleForm.servicedate = datetime
      },
      // 上传图片成功显示
      handleAvatarSuccess(res, file) {
        if(res.code == 401){
          Message({
            message: '网络错误' + res.msg,
            type: 'error',
            duration: 3 * 1000
          })
          stores.LOGIN_OUT()
        }else{
          this.ruleForm.logo=res.imageSrc;
          this.imageUrl = URL.createObjectURL(file.raw);
        }
			    
      },
      // 上传图片之前对图片进行判断
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      },
      submitForm(formName) {
          var _this = this;
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              Message({
                message: '信息填写有误',
                type: 'error',
                duration: 3 * 1000
              })
              return false;
            }
          });
        addStation(_this.ruleForm).then(res=>{
          if(res.code == 0){
            Message({
                message:res.msg,
                type: 'success',
                duration: 3 * 1000
              })
              _this.resetForm()
              _this.addOilType="添加"
              _this.activeName = "OliList"
          }else{
            Message({
                message: '错误信息'+res.msg,
                type: 'error',
                duration: 3 * 1000
              })
          }
        })
      },
      updateInfo(index,row){
        this.activeName = "addList"
        this.addOilType="修改"
        this.ruleForm = row
        this.imageUrl = "http://you.yunfeiyang.com"+row.logo;
        console.log(row)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.e1=""
        this.ruleForm.e2=""
        this.ruleForm.e4=""
        this.imageUrl=""
        
      },




    // 查询按钮
    searchBtn(){
      this.currentPage = 1;
      this.query();
    },
    // 修改状态
    updateStatusRow(index, row){
      var _this = this
      _this.as = row;
      
      var status = row.status == '0' ? "启用":"停用";
      this.$confirm('确定要'+status+'此加油站吗?', '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.as.status=Math.abs(parseInt(row.status)-1);
          changeStatus(_this.as).then(res => {
            console.log(res)
            if(res.code==0){
              this.$message({
                type: 'success',
                message: status+'成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message:res.msg
              });     
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: status+'已取消'
          });          
        });
    },
    // 获取油站列表
    query(){
      var _this = this;
      var data = {
        page: _this.currentPage,
        limit: _this.limit,
        departname: _this.departname
      }
      addOilList(data).then(res => {
        if(res.code==0){
          _this.tableData=[];
          for(var item of res.page.list){
              _this.tableData.push(item);
          }
            _this.sizeLength=res.page.totalCount;
          
        }
      })
    },
    handleClick(tab, event) {
      if(tab.name=="OliList"){
        this.addOilType="添加"
        this.ruleForm= {
          e3:'0',
          departname: '',
          deptabbr:'',
          attn:'',
          mobile:'',
          email:'',
          openTime:"08：30-22：30",
          servicedate: '',
          e1:'',
          e2:"",
          e4:'',
          address: '',
          logo:'',
          notes:'',
        }
      }
      console.log(tab, event);
    },
    handleSizeChange(val) {
      var _this = this;
      _this.limit = val;
        // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var _this = this;
      _this.currentPage = val;
      _this.query();
      console.log(`当前页: ${val}`);
    }
  },
  computed: {
    dateRange () {
      const { startTime, endTime } = this
      var  serverTime = startTime + '-' + endTime
      return serverTime
    }
  },
  watch: {
    dateRange (val) {
      this.ruleForm.openTime = val
    }
  }
}

</script>
<style scoped>
.my_display{
  display: flex;
  align-items: center;
}
.el-dialog{
  width: 30%;
  z-index: 99999999999;
}
.aaa{
  z-index: 9999999;
  top: -50vh;
}
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
</style>