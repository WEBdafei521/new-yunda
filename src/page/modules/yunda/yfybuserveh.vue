<!--  -->
<template>
  <div>
      <div class="my_display">
        <h5 style="color:#555;margin-right:10px;">加油站名</h5>
        <el-input v-model="input" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入内容"></el-input>
        <el-button type="primary" style="height:40px;line-height:0px;">查询</el-button>
      </div>

      <div>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="加油站列表" name="OliList"> 
            <div class="block">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  className="animated fadeInLeft  delay-.1s"
                  fixed
                  prop="username"
                  label="司机"
                  max-width="180">
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-.1s"
                  prop="mobile"
                  label="手机号"
                  max-width="180">
                </el-table-column>
                <el-table-column
                  className="animated fadeInLeft  delay-.1s"
                  label="操作"
                  max-width="180">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="updateStatusRow(scope.$index, scope.row)">人车匹配</el-button>
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
          

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <template>
              <el-transfer
                filterable
                v-model="value"
                :props="{
                  key: 'value',
                  label: 'desc'
                }"
                :data="data">
              </el-transfer>
            </template>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose">取 消</el-button>
              <el-button type="primary" @click="distribution">分 配</el-button>
            </span>
          </el-dialog>


          <el-tab-pane label="添加" name="addList">
            
          </el-tab-pane>
        </el-tabs>
        
      </div>
  </div>
</template>

<script>
// import {list, driverList} from '../../../api/yfybuserveh/index';
export default {
  data () {
    const generateData = _ => {
        const data = [];
        driverList({
          page:1,
          limit:200
        }).then(res=>{
          console.log(res)
          for(var item of res.page.list){
              data.push({
              value: item.id,
              desc: `${ item.lpn }`,
              disabled:false
            });
          }
        })
        
        return data;
    };
    return {
      input:"",
      activeName: 'OliList',
      tableData: [],
      pageSize:"10",
      currentPage:"1",
      sizeLength:0,
      data: generateData(),
      value: [],
      dialogVisible: false,
    };
  },
  created(){
    this.depart()
  },
  components: {},

  computed: {},


  methods: {
    distribution(e){
      var that = this;
      console.log(this.value)
      for(var item of this.data){
        for(var id of that.value){
          if(item.value == id){
            console.log(item)
          }
        }
        // console.log(item)
      }
    },
    // 分配取消
    handleClose(done) {
      var that = this;
      this.dialogVisible= false
      this.$confirm('确认关闭？')
        .then(_ => {
          that.value=[];
          done();
        }).catch(_ => {});
      },
    // 获取部门列表
    depart(){
      var jsons = {};
      jsons.page= this.currentPage
	    jsons.limit= this.pageSize	
      list({
        page:this.currentPage,
        limit:this.pageSize,
        "_":1578029777792
      }).then(res =>{
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    updateStatusRow(index, row){
      this.dialogVisible = true
      return
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

    // 页面显示数据条数
    handleSizeChange(e){
      this.pageSize = e;
      this.depart();
    },
    // 下一页
    handleCurrentChange(e){
      this.currentPage = e;
      this.depart();
    },
  }
}

</script>
<style scoped>
</style>