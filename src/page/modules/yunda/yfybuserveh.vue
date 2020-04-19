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
                  <template>
                     <el-button type="success">人车匹配</el-button>  
                   </template>
                    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
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
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
import {getUserList} from '../../../api/yfybuserveh/index'
export default {
  data () {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      var baseURL = "http://you.yunfeiyang.com:8080/"
      //登录token
      var token = localStorage.getItem("tokens");
    return {
      data: generateData(),
        value: [1, 4],
      oilType:"添加",
      sizeLength:1,
      tableData:[],
      inputval:"",
      activeName: 'OliList',
      pageSize:10,
      currentPage:1,
      dialogVisible:false

    };
  },
  created(){
    this.userLists()
  },
  components: {},

  computed: {},


  methods: {
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