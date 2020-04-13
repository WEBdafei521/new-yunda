<!--  -->
<template>
  <div>
    <el-container>

      <!-- aside -->
       <div> 
        <el-menu :default-active="default_active_index" class="el-menu-vertical-demo" :collapse-transition="true" @open="handleOpen" @select="handleSelect" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" active-background-color="#0A8061">
          <!-- <div >123</div> -->
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
          <!-- 历史标签 -->
          <div class="l-main-title-left">
            <div @click="openClose" class="l-main-title-close" style="fontSize:21px;">
              <i class="el-icon-s-fold"></i>
            </div>
            <div class="l-history_label">
              <div class="l-menu-name">主页</div>
              <div class="l-menu-del">
                <i class="el-icon-close"></i>
              </div>
            </div>
          </div>
          <!-- 用户的信息 -->
          <div class="l-main-title-right">
            <!-- 用户设置 -->
            <div>
                <el-popover
                  placement="left"
                  width="240"
                  v-model="visible">
                  <div>
                      <div>手机号：18736911636</div>
                      <div>电子邮箱：591094678@qq.com</div>
                      <div style="text-align: center; margin: 0;margin-top:20px;" class="my_display">
                        <el-button @click="dialogFormVisible = true"><i class="el-icon-setting"></i>修改密码</el-button>
                        <el-button type="danger" @click="loginOut"><i class="el-icon-warning"></i>退出登录</el-button>
                      </div>
                  </div>
                  <el-button style="color:#999;border:0;font-size:14px;" slot="reference">您好，<span style="fontWeight:600;color:#333333;">admin</span> <i class="el-icon-arrow-down"></i> </el-button>
                </el-popover>
              </div>
            <!-- 生成邀请码 -->
            <div class="l-main-title-download">div</div>
          </div>
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
      //左侧导航栏  
      openClose(){
        this.isCollapse = ! this.isCollapse;
      },
      loginOut(){},
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
    padding: 0 30px 0 0;
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .l-main-title-left{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l-main-title-close{
    margin: 0 8px;
    cursor: pointer;
  }
  .l-history_label{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #7c7b7b;
    border: 1px solid #eeeeee;
    padding: 0 3px;
    
  }
  .l-menu-name{
    text-align: center;
    padding:0 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .l-menu-del{
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid #e3e3e3;
  }
  .l-main-title-right{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l-main-title-download{
    width: 100px;
    text-align: center;
  }
</style>