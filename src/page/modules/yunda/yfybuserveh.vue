<!--  -->
<template>
  <div>
      
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="人车匹配" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">司机名称</h5>
              <el-input v-model="inputval" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入司机名称"></el-input>
              <el-button type="primary" style="height:40px;line-height:0px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="username"
                  label="司机名称"
                  max-width="200">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="mobile"
                  label="手机号"
                  max-width="200">
                </el-table-column>
               
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="zip"
                  label="操作"
                  max-width="200">
                    <template slot-scope="scope">
                      <el-button type="success" @click="pipei(scope.$index, scope.row)">人车匹配</el-button>  
                    </template>
                    <el-dialog
                      title="提示"
                      :visible.sync="dialogVisible"
                      :append-to-body="true"
                      :center="true"
                      width="50%"
                      >
                      <template>
                        <div style="display: flex;justify-content: center;align-items: center;">
                          <el-transfer v-model="value" :data="data"></el-transfer>
                        </div>
                      </template>
                      


                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="comfirm">确 定</el-button>
                      </span>
                    </el-dialog>
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
        </el-tabs>
      
      </div>
  </div>
</template>

<script>
import {getUserList,getCarList,getUserCarList,fenpei} from '../../../api/yfybuserveh/index'
import * as stores from '../../../store/methods'
export default {
  data () {
      
    return {
      oilType:"添加",
      data: [{
        key:1,
        label:"司机一"
      },{
        key:2,
        label:"司机二"
      },{
        key:3,
        label:"司机三"
      }],
      value: [],
      
      sizeLength:1,
      tableData:[],
      inputval:"",
      activeName: 'OliList',
      pageSize:10,
      currentPage:1,
      dialogVisible:false,
      userId:""

    };
  },
  created(){
    this.userLists()
    this.carList()
  },
  components: {},

  computed: {},


  methods: {
    comfirm(){
      var arr = []
      for(var item of this.value){
        var obj = {}
        obj.vehId = item;
        obj.userId = this.userId;
        arr.push(obj)
      }
      fenpei(arr,this.userId).then(res => {
        if(res.code == 0){
          this.$message({
                  type: 'success',
                  message: '匹配成功！'
                });
          this.dialogVisible = false;
          this.userId = ""
          this.value=""
        }
      })
    },
    pipei(index,row){
      this.dialogVisible = true;
      var userId = row.userId;
      this.userId = userId;
      getUserCarList({userId:userId}).then(res => {
        var arr = res.page.list;
        var arrary = []
        for(var item of arr){
          arrary.push(item.vehId)
        }
        this.value = arrary
      })
    },
    carList(){
      getCarList({page:1,limit:200}).then(res => {
        this.data = stores.setCarRuleInfo(res.page.list);
      })
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    // 查询油站列表
    searchDepart(){
      this.userLists(this.inputval)
    },
   
    // 获取部门列表
    userLists(e){
      getUserList({
        page:this.currentPage,
        limit:this.pageSize,
        key:e
      }).then(res =>{
        console.log(res)
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.userLists();
    },
    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.userLists();
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
  .el-dialog__body{
    display: flex;
    justify-content: center;
     align-items: center;
  }
</style>