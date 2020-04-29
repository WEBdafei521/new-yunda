<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="加油统计" name="OliList" class=""> 
            <div class="l-display">
              <h5 style="color:#000;margin:0 10px;">时间</h5>
              <h5 style="color:#000;margin:0 10px;">时间</h5>
              <el-date-picker
                @change="selectTime"
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
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
              <el-button type="primary" style="height:40px;line-height:0px;margin:0 16px;" @click="searchDepart">查询</el-button>
            </div>
            <div class="block">
              <div v-html="tables">

              </div>
            </div>
            
          </el-tab-pane>

        </el-tabs>
      </div>
  </div>
</template>

<script>
import * as stores from '../../../store/methods'
export default {
  data () {
    return {
      activeName: 'OliList',

      companyOptions:[],
      orgCodeValue:"",
      orgCodeValue1:"",
      stationOptions:[],
      goodsCode:"",
    
      value2:"2020-04-05",
      startTime:"2020-04-22",
      endTime:"2020-04-29",
      tables:"",
      lpn:"",
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      
    };
  },
  created(){
    this.getOilLists()
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
    selectTime(e){
      this.startTime = e[0]
      this.endTime = e[1]
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

    // 查询油站列表
    searchDepart(){
      this.getOilLists()
    },
    
    // 获取油品列表
    getOilLists(e){
      stores.getList({
        startTime:this.startTime,
        endTime:this.endTime,
        exportType:"1",
        oilTankNo:"",
        selectOrgCode:this.orgCodeValue?this.orgCodeValue:this.orgCodeValue1,
      },"yunda/yfytoiltrade/showExcelSation").then(res =>{
        this.tables = res;
      })
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