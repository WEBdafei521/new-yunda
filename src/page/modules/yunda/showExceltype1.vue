<!--  -->
<template>
  <div>
      <div class="animated slideInRight  delay-1s">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="加油统计" name="OliList" class=""> 
            <div class="l-display">
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
              <h5 style="color:#000;margin:0 10px;">司机</h5>
              <el-input v-model="driver" style="width:220px;height:40px;margin-right:10px;" clearable placeholder="请输入司机名称"></el-input>
              
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
      value2:"",
      startTime:"",
      endTime:"",
      tables:"",
      goodsCode:"",
      driver:"",
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
  
  },
  components: {},

  computed: {},


  methods: {
    selectTime(e){
      this.startTime = e[0]
      this.endTime = e[1]
    },
    getOilTypeList(){
      stores.setCarRule().then(res=>{
        this.optionsP = res
      })
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
        driver:this.driver,
        lpn:""
      },"yunda/yfytoiltrade/showExcel").then(res =>{
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