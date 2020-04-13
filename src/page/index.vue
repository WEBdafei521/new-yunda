<!--  -->
<template>
  <div>
    <el-container>

      <!-- aside -->
       <div> 
        <el-menu :default-active="default_active_index" class="el-menu-vertical-demo" :collapse-transition="true" @open="handleOpen" @select="handleSelect" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" active-background-color="#0A8061">
          <div>123</div>
          <el-submenu v-for="(item,index) of menuList" :key="index" :index="index.toString()">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="(item1,index1) of item.list" :key="index1" :index="index+'-'+index1">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item1.name}}</span>
            </el-menu-item>
          </el-submenu>
       
        </el-menu>
      </div> 
      <!-- main -->
      <div class="l-main-title"> 
          <div class="l-main-title-top">
            <img style="" @click="openClose" src="../assets/icon/menu_icon.png" alt="">
            <div class="l-history_label">主页</div>
          </div>
          <!-- <button @click="openClose">
            折叠
          </button> -->
      </div>

    </el-container>
  </div>
</template>

<script>
import * as stores from '../store/methods'
import {indexNav, updatePwd,downLoadImg} from '../api/request'
export default {
  components: {},
  data () {
    return {
      isCollapse: false,
      menuList:[],
      default_active_index:"0-0"
    };
  },
 created(){
   this.navList()
 },
 methods:{
      openClose(){
        this.isCollapse = ! this.isCollapse;
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        var menuList = this.menuList;
        // 解析url
        stores.getMenUrl(menuList,key)
        this.default_active_index = key;
      },
   // 请求菜单数据
    navList(){
      var _this=this;
      indexNav().then(res=>{
        if(res.code==0){
          var list = stores.setMenuList(res.menuList)
          _this.menuList = list;
        }
      })
    },
 },
 mounted(){},
 computed:{},
}
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width:201px;
    height: 100vh;
  }
  .el-menu--collapse{
    height:100vh;
  }
  /* 选中状态下的列表 */
  .el-menu--inline .is-active {
    background-color:#218062 !important;
  } 
  .l-main-title{
    height: 40px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .l-main-title-top{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l-main-title-top img{
    width: 21px;
    height: 21px;
    margin: 0 8px;
  }
</style>