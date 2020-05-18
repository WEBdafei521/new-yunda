<!--  -->
<template>
  <div>
    <div id="main"></div>
    <div>123</div>
  </div>
</template>

<script>
// import echarts from '../store/echarts'
import echarts from 'echarts/lib/echarts'
  
// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
 
export default {
  components: {},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
 created(){},
 methods:{},
 mounted(){
    var dom6 = document.getElementById('main')
    var myChart6 = echarts.init(dom6)
      myChart6.setOption({
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
              }
          }]
    });
 },
 computed:{},
}
</script>
<style scoped>
</style>