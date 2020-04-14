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
      <div class="l-main">
        <!-- main - title -->
        <div class="l-main-title l-color-back-white"> 
          <div>
            <!-- 历史标签 -->
            <div class="l-main-title-left l-color-back-white">
              <div @click="openClose" class="l-main-title-close " style="fontSize:21px;">
                <i class="el-icon-s-fold"></i>
              </div>
              
            </div>
            <!-- 用户的信息 -->
            <div class="l-main-title-right">
              <!-- 用户设置 -->
              <div>
                  <el-popover
                    placement="bottom"
                    width="240"
                    v-model="visible">
                    <div>
                        <div>手机号：{{userInfo.mobile}}</div>
                        <div>电子邮箱：{{userInfo.email}}</div>
                        <div style="text-align: center; margin: 0;margin-top:20px;" class="my_display">
                          <el-button @click="dialogFormVisible = true"><i class="el-icon-setting"></i>修改密码</el-button>
                          <el-button type="danger" @click="loginOuts"><i class="el-icon-warning"></i>退出登录</el-button>
                        </div>
                    </div>
                    <el-button style="border:0;font-size:14px;" class="l-color-back-white" slot="reference">您好，<span style="fontWeight:600;" class="color:#333333;">{{userInfo.username}}</span> <i class="el-icon-arrow-down"></i> </el-button>
                  </el-popover>
              </div>
              <!-- 生成邀请码 -->
              <div class="l-main-title-download">
                <el-popover
                    placement="bottom"
                    width="240"
                    v-model="visible1">
                    <div class="l-yqm">
                        <div>机构编码：{{userInfo.orgCode}}</div>
                        <div style="text-align: center;padding:8px 0;">
                          <el-button @click="download"><i class="el-icon-office-building"></i>生成邀请码</el-button>
                        </div>
                    </div>
                    <el-button style="border:0;font-size:14px;" class="l-color-back-white" slot="reference"> <i style="fontWeight:600;" class="el-icon-office-building "></i> {{userInfo.departName}}</el-button>
                  </el-popover>
              </div>
            </div>
          </div>
          
        </div>
        <!-- main - main -->
        <div class="l-main-index">
          <transition>
            <router-view/>
          </transition>
        </div>
      </div>

    </el-container>
  </div>
</template>

<script>
import router from '../router'
import * as stores from '../store/methods'
import {indexNav, updatePwd,downLoadImg} from '../api/request'
export default {
  components: {},
  data () {
    return {
      isCollapse: false,
      menuList:[],
      default_active_index:"0-0",
      // 用户信息弹框
      visible:false,
      // 邀请码下载框
      visible1:false,
      userInfo:{},
      dialogFormVisible:false,
    };
  },
 created(){
   this.userInfo = JSON.parse(this.$store.getters.get_yd_user_info);
   this.navList()
 },
 methods:{
    // 确定修改密码
      
      // 退出登录
      loginOuts(){
        var _this=this;
         _this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已退出!'
          });
          stores.LOGIN_OUT()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
    // 取消修改密码
      cancels(){
        var _this = this;
        _this.form.oldPwd = '';
        _this.form.newPwd = '';
        _this.dialogFormVisible = false;
      },
      //左侧导航栏  
      openClose(){
        this.isCollapse = ! this.isCollapse;
      },
      // 下载邀请码
      download(){
        location.href = "http://you.yunfeiyang.com:8080/sys/gen/downloadImg"
      },
      // 退出登录
      loginOut(){},
      // 校验修改密码信息
      
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        var menuList = this.menuList;
        // 解析url
        var urls = stores.getMenUrl(menuList,key)
        console.log(urls)
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
  .l-main-index{
    padding: 8px 0 0 8px;
    box-sizing: border-box;
    background: #7d8185;
  }
  .l-color-back-white{
    color: #fff;
    background: rgb(84, 92, 100);
    
  }
  ::-webkit-scrollbar {
    width: 1px;
    height: 6px;
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 1);
  } 

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width:220px;
    height: 100vh;
    overflow: auto;
  }
  .el-menu{
    border-right: 0;
  }
  .el-menu--collapse{
    height:100vh;
  }
  /* 选中状态下的列表 */
  .el-menu--inline .is-active {
    background-color:#218062 !important;
  } 
  .l-main-title{
    position: relative;
    z-index: 1;
    width: 100%;
  }
  .l-main-title>div{
    height: 45px;
    width: 100%;
    padding: 0 30px 0 0;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
    box-shadow:1px 1px 7px #000000;
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
 

  .l-main-title-right{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l-main-title-download{
    /* width: 230px; */
    text-align: center;
  }
  .l-main{
    width: 100%;
    height: 100%;
  }
  .l-yqm{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>