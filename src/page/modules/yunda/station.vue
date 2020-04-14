<template>
  <div>
      <div class="my_display">
        <h5 style="color:#555;margin-right:10px;">加油站名</h5>
        <el-input v-model="departname" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="searchBtn" style="height:40px;line-height:0px;">查询</el-button>
      </div>
      <h1 class="animated fadeInDown  delay-.1s">animate  fadeInLeft</h1>
      <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="加油站列表" name="OliList"> 
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated fadeInDown  delay-1s"
                  prop="e3"
                  label="油站编号"
                  width="150">
                </el-table-column>
                <el-table-column
                  className="animated fadeInDown  delay-1s"
                  prop="departname"
                  label="加油站名"
                  width="220">
                </el-table-column>
                <el-table-column
                  className="animated fadeInDown  delay-1s"
                  prop="attn"
                  label="联系人"
                  width="220">
                </el-table-column>
                <el-table-column
                  className="animated fadeInDown  delay-1s"
                  prop="mobile"
                  label="手机号"
                  width="220">
                </el-table-column>
                 <el-table-column label="操作" width="250" className="animated fadeInDown  delay-1s">
                   <template slot-scope="scope">
                     <el-button type="primary">修改</el-button>  
                     <el-button v-if="scope.row.status == '0' " type="danger" @click="updateStatusRow(scope.$index, scope.row)">启用</el-button>  
                     <el-button v-if="scope.row.status == '1' " type="danger" @click="updateStatusRow(scope.$index, scope.row)">停用</el-button>  
                   </template>
                    
                 </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="7"
                layout="total, sizes, prev, pager, next, jumper"
                :total="sizeLength">
              </el-pagination>
            </div>
            
          </el-tab-pane>
          <el-tab-pane label="添加" name="addList">
            

            
              <div class="my_display_mid">
                <el-col :span="11">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="油站名称" prop="num" class="animated slideInRight  delay-.1s">
                      <el-input disabled v-model="ruleForm.num"></el-input>
                    </el-form-item>
                    <el-form-item label="油站名称" prop="name" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="简称" prop="simpleName" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.simpleName"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="联系人" prop="contactPeople" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.contactPeople"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phoneNum" class="animated slideInRight  delay-.1s">
                      <el-input type="number" v-model="ruleForm.phoneNum"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="emails" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.emails"></el-input>
                    </el-form-item>
                    <el-form-item label="服务到期时间" required class="animated slideInRight  delay-.1s">
                      <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="省" prop="province" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.province"></el-input>
                    </el-form-item>
                    <el-form-item label="县" prop="xian" class="animated slideInRight  delay-.1s">
                      <el-input v-model="ruleForm.xian"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="desc" class="animated slideInRight  delay-.1s">
                      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>

                    <el-form-item label="logo" prop="logo" class="animated slideInRight  delay-.1s">
                      <el-input type="file" v-model="ruleForm.logo"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark" class="animated slideInRight  delay-.1s">
                      <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
import {addOilList, changeStatus} from '../../../api/request'
export default {
  data () {
    var checkPhone = (rule, value, callback) =>{
      if(value.length !== 11){
         callback(new Error('请输入正确的手机号'));
      }
    }
    return {
      activeName: 'OliList',
      sizeLength:50,
      currentPage4:1,
      limit:"",
      departname:"",
      tableData: [],

      ruleForm: {
          num:'00000001',
          name: '',
          simpleName:'',
          contactPeople:'',
          phoneNum:'',
          emails:'',
          date: '',
          province:'',
          xian:'',
          desc: '',
          logo:'',
          remark:''
      },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          simpleName: [
            { required: true, message: '请输入简称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          contactPeople: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          phoneNum: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
           emails: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 5, max: 16, message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          province: [
            { required: true, message: '请选择省份', trigger: 'blur' },
            { min: 0, max: 16, message: '请选择省份', trigger: 'blur' }
          ],
          xian: [
            { required: true, message: '请选择县', trigger: 'blur' },
            { min: 0, max: 16, message: '请选择县', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '请选择Logo', trigger: 'blur' },
            { message: '请选择Logo', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
      }
    };
  },

  components: {},

  computed: {
    
  },

  mounted() {
    this.query()
  },
  methods: {
     submitForm(formName) {
       console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          // if (valid) {
          //   alert('submit!');
          // } else {
          //   console.log('error submit!!');
          //   return false;
          // }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },





    searchBtn(){
      this.query();
    },
    updateStatusRow(index, row){
      var updataStatus = row;
      
      var status = row.status == '0' ? "启用":"停用";
      this.$confirm('确定要'+status+'此加油站吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updataStatus.status=Math.abs(parseInt(row.status)-1);
          $.ajax({
            type: "POST",
            url: "http://121.199.72.39:8080/yunda/yfysdepart/update/station",
            contentType: "application/json",
            headers:{
              Accept: "application/json, text/javascript, */*; q=0.01",
              "Content-Type":'application/json',
              'token':localStorage.getItem('tokens'),
              'Access-Control-Allow-Origin': '*'
            },
            data: JSON.stringify(updataStatus),
            success: function(r){
              console.log(r)
            }
          });
          // changeStatus(data).then(res => {
          //   console.log(res)
          //   if(res.code==0){
              this.$message({
                type: 'success',
                message: status+'成功!'
              });
          //   }else{
          //     this.$message({
          //       type: 'error',
          //       message:res.msg
          //     });     
          //   }
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: status+'已取消'
          });          
        });
    },
    query(){
      var _this = this;
      var data = {
        page: _this.currentPage4,
        limit: _this.limit,
        departname: _this.departname
      }
      addOilList(data).then(res => {
        // console.log(res)
        var pageLength=0;
        if(res.code==0){
          _this.tableData=[];
          for(var item of res.page.list){
            if(item.attn!==null){
              pageLength+=1;
              _this.tableData.push(item);
            }
          }
          _this.sizeLength=pageLength;
          
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      var _this = this;
      _this.limit = val;
        console.log(`每页 ${val} 条`);
    },
      handleCurrentChange(val) {
        var _this = this;
        _this.currentPage4 = val;
        _this.query();
        console.log(`当前页: ${val}`);
      }
  }
}

</script>
<style scoped>
</style>