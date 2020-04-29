<!--  -->
<template>
  <div>
      <div class="my_display">
        <h5 style="color:#555;margin-right:10px;">加油站名</h5>
        <el-input v-model="input" style="width:220px;height:35px;margin-right:10px;" clearable placeholder="请输入内容"></el-input>
        <el-button type="primary" style="height:40px;line-height:0px;">查询</el-button>
      </div>

      <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="加油站列表" name="OliList"> 
            <div class="block">
              <span class="demonstration">油品字典</span>
              <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[20, 40, 60, 80]"
                :page-size="7"
                layout="total, sizes, prev, pager, next, jumper"
                :total="sizeLength">
              </el-pagination> -->
            </div>
            
          </el-tab-pane>
          <el-tab-pane label="添加" name="addList">配置管理</el-tab-pane>
        </el-tabs>

      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input:"",
      activeName: 'OliList',
      sizeLength:50
    };
  },

  components: {},

  computed: {},


  methods: {
     handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}

</script>
<style scoped>
</style>