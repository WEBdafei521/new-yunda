<!--  -->
<template>
  <div>
    <div class="l-main-map">
      <div id="allmap" style="width:100%;" :style="{height:screenHeight-53+'px'}"></div>
    </div>
  </div>
</template>

<script>
import * as store from '../store/methods'
import {mainInfo} from '../api/request'
export default {
  components: {},
  data () {
    return {
      screenHeight: document.documentElement.clientHeight || document.body.clientHeight,// 屏幕高度
      list_station:[]
    };
  },
 created(){
  //  var stationPosition = localStorage.getItem("stationPosition");
   
 },
 methods:{
   drapMaoGl(){
      // GL版命名空间为BMapGL
      var map = new BMapGL.Map("allmap");    // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(113.54834385,34.79361006),4);  // 初始化地图,设置中心点坐标和地图级别

      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式

      map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
      map.addControl(new BMapGL.ZoomControl()); // 添加比例尺控件
    
      var data_info = this.list_station
      
      for(let i = 0 ; i<data_info.length; i ++){
        var opts = {
          width : 282,     // 信息窗口宽度
          height: 197,     // 信息窗口高度
          title : "   油站详情" , // 信息窗口标题
          enableMessage:true
        }
         var tipHtml = '<div style="width:280px;height:99%;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">'
										+'<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px;box-sizing: border-box">'+'<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">'+'</i>'
										+'<span style="margin-left:10px;color:#fff;font-size:16px;">'+data_info[i].address+'</span>'+'</div>'
										+'<div style="padding:10px">'
										+'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
										+'站点名称：'+'<span style="color:#11ee7d;margin:0 6px;">'+data_info[i].stationName+'</span>'+''+'</p>'
										+'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
										+'联系人：'+'<span style="color:#f48225;margin:0 6px;">'+data_info[i].people+'</span>'+''+'</p>'
										+'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
										+'联系电话：'+'<span style="color:#f4e925;margin:0 6px;">'+data_info[i].peoplePhone+'</span>'+''+'</p>'
										+'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
										+'设备号：'+'<span style="color:#25f4f2;margin:0 6px;">'+data_info[i].controllerNo+'</span>'+''+'</p>'
										+'</div>'+'</div>';
        let point = new BMapGL.Point(data_info[i].lon,data_info[i].lat)
        let marker = new BMapGL.Marker(point);  // 创建标注
        map.addOverlay(marker);          // 将标注添加到地图中
        let infoWindow = new BMapGL.InfoWindow(tipHtml, opts);
        marker.addEventListener("click", function(){          
          map.openInfoWindow(infoWindow, point); //开启信息窗口
        }); 
      }
     

   }
 },

 mounted(){
   var _this = this
    window.onresize = function () { // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight // 窗口高度
    }
    // 获取油站信息
    var getStaPos = store.getStationPosition
    getStaPos().then(res=>{
      var arr = JSON.parse(res)
      _this.list_station=arr
      _this.drapMaoGl()
    })
    
 },
 computed:{},
}
</script>
<style scoped>
.l-main-map{
  }
  #allmap{
    height: 100vh;
    width: 100%;
  }
</style>