<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="司机授权管理" name="OliList" class=""> 
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
              <h5 style="color:#000;margin:0 10px;">车牌号</h5>
              <el-input v-model="sname" style="width:200px;"></el-input>
              <h5 style="color:#000;margin:0 10px;">余量</h5>
              <el-input-number v-model="staNum" label="描述文字"></el-input-number>-
              <el-input-number v-model="endNum" label="描述文字"></el-input-number>
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
                  prop="sname"
                  label="司机"
                  max-width="120">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="username"
                  label="用户名"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="authQuantity"
                  label="计划授权量(L)"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="authTimeType"
                  label="授权周期"
                  max-width="150">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.authTimeType == 1 " size="big" type="success">升/月</el-tag>
                    <el-tag v-if="scope.row.authTimeType == 2 " size="mini" type="success">升/季度</el-tag>
                    <el-tag v-if="scope.row.authTimeType == 3 " size="mini" type="success">升/年</el-tag>
                    <el-tag v-if="scope.row.authTimeType == 9 " size="mini" type="success">不限</el-tag>
                  </template>
                  
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  prop="authSurplus"
                  label="剩余授权量(L)"
                  max-width="150">
                </el-table-column>
                <el-table-column
                  className="animated slideInRight  delay-1s"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="updataPrice(scope.$index, scope.row)">修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="油品调价"
                append-to-body
                :visible.sync="dialogVisible"
                width="30%">
                <div class="l-display-cum">
                  <div class="l-display-item">
                    <h5 style="color:#000;margin:0 10px;">司机名称</h5>
                    <el-input disabled v-model="updataRow.sname" style="width:200px;"></el-input>
                  </div>
                  <div class="l-display-item">
                    <h5 style="color:#000;margin:0 10px;">授权周期 </h5>
                    <el-select v-model="updataRow.authTimeType" placeholder="请选择">
                      <el-option
                        v-for="item in gunOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="l-display-item">
                    <h5 style="color:#000;margin:0 10px;">授权量</h5>
                    <el-input v-model="updataRow.authQuantity" style="width:200px;"></el-input>
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

        </el-tabs>
      </div>
  </div>
</template>

<script>
import {getOilList,saveOilType,getGun} from '../../../api/goods/index';

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

      companyOptions:[],
      orgCodeValue:"",
      orgCodeValue1:"",
      stationOptions:[],
      goodsCode:"",
      sname:"",
      
      updataRow:{},
      staNum:"",
      endNum:"",
      // 选择油品类型
      optionsP:[],
      defaultParams: {
         label: 'name',
         value: 'id',
         children: 'children'
      },

      gunOptions:[{
        value:"1",
        label:"升/月"
      },{
        value:"2",
        label:"升/季度"
      },{
        value:"3",
        label:"升/年"
      },
      {
        value:"9",
        label:"不限"
      }]
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

  
    // 调价
    updataPrice(index,row){
      this.updataRow = row
      this.dialogVisible=true
    },
    tiaojia(){
      var obj={
      }

      // var price = stores.testMoney(this.newPrice)
      stores.updata(this.updataRow,"auth/yfybvehauth/updateAuth").then(res => {
        // console.log(row)
        if(res.code == 0){
          this.$message({
                  type: 'success',
                  message: res.msg
                });
          this.dialogVisible=false;
          this.updataRow = {};
        }else{
          this.$message({
                  type: 'info',
                  message: res.msg
                });
                this.dialogVisible=false;
          this.updataRow = {};
        }
      })
     
    },
    
    // 获取油品列表
    getOilLists(e){
      stores.getList({
        page:this.currentPage,
        limit:this.pageSize,
        orgCode:this.orgCodeValue?this.orgCodeValue:this.orgCodeValue1,
        sname:this.sname,
        staNum:this.staNum==0?"":this.staNum,
        endNum:this.endNum==0?"":this.endNum,
        authTimeType:"",
      },"auth/yfybvehauth/list").then(res =>{
        // console.log(res)
        var list = res.page.list;
        var size = res.page.totalCount;
        this.sizeLength = size;
        this.tableData = list;
      })
    },
    handleClick(tab, event) {
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
    justify-content: space-around;
    align-items: center;
    margin: 16px 0;
  }
  .l-display-cum{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>