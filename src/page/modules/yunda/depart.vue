<!--  -->
<template>
  <div>
      <div class="l-display">
        <h5 style="color:#fff;margin-right:10px;">加油站名</h5>
        <el-input v-model="input" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入内容"></el-input>
        <el-button type="primary" style="height:40px;line-height:0px;">查询</el-button>
      </div>
      <h1 class="animated slideInRight  delay-.1s">animate  fadeInLeft</h1>
      
      <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="加油站列表" name="OliList"> 
            <div class="block">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  className="animated fadeInLeft  delay-1s"
                  fixed
                  prop="e3"
                  label="部门编号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-1s"
                  prop="orgCode"
                  label="机构编号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-1s"
                  prop="departname"
                  label="部门名称"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-1s"
                  prop="attn"
                  label="联系人"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-1s"
                  prop="mobile"
                  label="手机号"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-1s"
                  prop="zip"
                  label="状态"
                  max-width="150">
                  <template slot-scope="scope">
                    <span class="label label-danger " style="background:red;padding:6px;color:#fff;font-weight:600;"  v-if="scope.row.status == '0' " >禁用</span>
                    <span class="label label-success" style="background:green;padding:6px;color:#fff;font-weight:600;" v-else>正常</span>
                  </template>
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-1s"
                  label="操作"
                  max-width="150">
                  <template slot-scope="scope">
                    <el-button  size="mini" type="primary" @click="updata(scope.$index, scope.row)">修改</el-button>
                    <el-button v-if="scope.row.status == '0' " size="mini" type="primary" @click="updateStatusRow(scope.$index, scope.row)">启用</el-button>
                    <el-button v-if="scope.row.status == '1' " size="mini" type="danger" @click="updateStatusRow(scope.$index, scope.row)">停用</el-button> 
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

          <el-tab-pane label="添加" name="addList">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!-- 部门编号 -->
              <el-form-item label="部门编号" prop="e3" class="animated slideInRight  delay-.1s">
                <el-input disabled value="000001" v-model="ruleForm.e3"></el-input>
              </el-form-item>
              <!-- 部门名称 -->
              <el-form-item label="部门名称" prop="departname" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.departname"></el-input>
              </el-form-item>
              <!-- 部门名称 -->
              <el-form-item label="简称" prop="deptabbr" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.deptabbr"></el-input>
              </el-form-item>
              <!-- 联系人 -->
              <el-form-item label="联系人" prop="attn" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.attn"></el-input>
              </el-form-item>
              <!-- 手机号 -->
              <el-form-item label="手机号" prop="mobile" class="animated slideInRight  delay-.1s">
                <el-input v-model.number="ruleForm.mobile"></el-input>
              </el-form-item>
              <!-- 电子邮箱 -->
              <el-form-item label="电子邮箱" prop="email" class="animated slideInRight  delay-.1s">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <!-- 日期选择 -->
              <el-form-item label="到期时间" class="animated slideInRight  delay-.1s">
                <el-col >
                  <el-date-picker type="date" placeholder="选择日期" picker-options="pickerOptions"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" v-model="ruleForm.servicedate" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <!-- 省 -->
              <el-form-item label="省份" class="animated slideInRight  delay-.1s">
                <el-col >
                  <el-select v-model="provinceValue" placeholder="请选择" @change="onProvinceChange">
                    <el-option
                      v-for="item in provinces"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <!-- 县 -->
              <el-form-item label="县" class="animated slideInRight  delay-.1s">
                <el-col >
                  <el-select v-model="cityValue" placeholder="请选择" @change="onCityChange">
                    <el-option
                      v-for="item in citys"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <!-- 活动形式 -->
               <el-form-item label="详细地址" prop="address" class="animated slideInRight  delay-.1s">
                <el-input type="textarea" v-model="ruleForm.address"></el-input>
              </el-form-item>
              <!-- 上传logo -->
              <el-form-item label="logo" class="animated slideInRight  delay-.1s">
                <el-upload
                  class="avatar-uploader"
                  :action="url.uploadActionUrl"
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
              <!-- 备注 -->
               <el-form-item label="备注" prop="notes" class="animated slideInRight  delay-.1s">
                <el-input type="textarea" v-model="ruleForm.notes"></el-input>
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
import {departList, updateRow, saveDepart} from '../../../api/depart/index';
import city1 from '../../js/city.json';
import province from '../../js/province.json'
export default {
  data () {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('部门名称不能为空'));
        }
      };
      var checkAbbreviation = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('简称不能为空'));
        }
      };
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系人不能为空'));
        }
      };
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系人不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            value = value+""
            if(!(/^1[3456789]\d{9}$/.test(value))){ 
                callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电子邮箱不能为空'));
        }else{
          var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error('请输入正确的邮箱'));
          }
        }
        
      };
      var checkActivity = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('详细地址不能为空'));
        }
      };
      var checkBeizhu = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('备注不能为空'));
        }
      };
      var baseURL = "http://you.yunfeiyang.com:8080/"
      //登录token
      var token = localStorage.getItem("tokens");
    return {
      
      // 省份
      provinces: [],
      provinceValue: '',
      provinceText: '',

      // 县
      citys: [],
      cityValue: '',
      cityText: '',
      url:{
        listUrl: "yunda/yfysdepart/getList/depart",
        addUrl: "yunda/yfysdepart/save/depart",
        updateUrl: "yunda/yfysdepart/update/station",//可复用
        deleteUrl: "yunda/yfysdepart/delete/station/",//可复用
        exportUrl: "yunda/yfysdepart/export",
        getDepartNo: "yunda/yfysdepart/get/departNo?type=3",
        uploadActionUrl: baseURL +"yunda/yfysdepart/uploadlogo?token="+token
      },
      input:"",
      activeName: 'OliList',
      sizeLength:0,
      currentPage:"1",
      pageSize:"10",
      tableData: [],
      addLine:{},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '一个月后',
          onClick(picker) {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            picker.$emit('pick', date);
          }
        }, {
          text: '半年后',
          onClick(picker) {
            const date = new Date();
            date.setMonth(date.getMonth() + 6);
            picker.$emit('pick', date);
          }
        }, {
          text: '一年后',
          onClick(picker) {
            const date = new Date();
            date.setMonth(date.getMonth() + 12);
            picker.$emit('pick', date);
          }
        }]
      },
      ruleForm: {
        address:"",
        attn:"",
        cityStr:"",
        departname:"",
        deptabbr:"",
        e1:"",
        e2:"",
        e3:"00000001",
        email:"",
        logo:"",
        mobile:"",
        notes:"",
        servicedate:"",
      },
      rules: {
          // 部门名称
          departname:[
            {validator: checkName, trigger: 'blur'} ],
          // 简称
          deptabbr:[
            {validator: checkAbbreviation, trigger: 'blur'}],
          // 联系人
          attn:[
            {validator: checkUsername, trigger: 'blur'} ],
          // 手机号
          mobile:[
            {validator: checkPhone, trigger: 'blur'} ],
          // email
          email:[
            {validator: checkEmail, trigger: 'blur'} ],
          // 详细地址
          address:[
            {validator: checkActivity, trigger: 'blur'}
          ],
           // notes
          notes:[
            {validator: checkBeizhu, trigger: 'blur'}
          ],
      },
      imageUrl:""
    };
  },
  created(){
    this.depart()
    var provinces = JSON.stringify(province)
    var arr = []
    for (let item of Object.entries(province)) {
      var obj = {}
      obj.value = item[0]
      obj.label = item[1]
      arr.push(obj)
    }
    this.provinces = arr; 
  },
  components: {},

  computed: {},


  methods: {
    // 选择省份onProvinceChange
    onProvinceChange(e){
      this.ruleForm.e1=e;
      this.cityValue=""

      for(var item of this.provinces){
        if(item.value == e){
          this.provinceText = item.label
          this.ruleForm.cityStr = item.label
        }
      }
      var arr = []
      for (let item of Object.entries(city1)) {
       var obj = {}
        obj.value = item[0]
        obj.label = item[1]
        arr.push(obj)
      }
      var city = [];
      for(var items of arr){
        if(items.value == e){
          for(var item1 of Object.entries(items.label)){
            var obj = {}
            obj.value = item1[0]
            obj.label = item1[1]
            city.push(obj)
          }
        } 
      }
      this.citys = city; 
    },
    onCityChange(e){
      this.ruleForm.e2=e;
      for(var item of this.citys){
        if(item.value == e){
          this.cityText = item.label
        }
      }
    },
    // 上传图片成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.logo=res.imageSrc;
			this.addLine.logo=res.imageSrc;
	    this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
    },
    // 提交
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        saveDepart(this.ruleForm).then(res =>{
          if(res.code==0){
            this.activeName="addList"
            this.ruleForm={
              address:"",
              attn:"",
              cityStr:"",
              departname:"",
              deptabbr:"",
              e1:"",
              e2:"",
              e3:"00000001",
              email:"",
              logo:"",
              mobile:"",
              notes:"",
              servicedate:"",
            }
          }
        })
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updata(e){
      console.log(e)
    },
    // 停用
    updateStatusRow(index, row){
      var _this = this
			var id = [row.id]
			_this.addLine = row
      var status = row.status == '0' ? "启用":"停用";
      this.$confirm('确定要'+status+'此部门吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.addLine.status=Math.abs(parseInt(row.status)-1);
            updateRow(_this.addLine).then(r =>{
              if (r.code == 0) {
                _this.$message({
                  type: 'success',
                  message: status+'成功!'
                });
                 _this.query();
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
    depart(){
      var jsons = {};

      jsons.page= this.currentPage
	    jsons.limit= this.pageSize	
	    jsons.departname= ""
      departList({
        page:this.currentPage,
        limit:this.pageSize,
        departname:""
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
        // console.log(tab, event);
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.depart();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.depart();
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
  }
</style>