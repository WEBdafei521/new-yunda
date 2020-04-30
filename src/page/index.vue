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
        <div class="l-main-title l-color-back-white" :class="isWhite==true?'l-is-white':''"> 
          <div class="l-title-url" :class="isWhite==true?'l-title-white':'l-title-block'">
            <!-- 当前标签 -->
            <div class="l-main-title-left l-color-back-white" :class="isWhite==true?'l-is-white':''">
              <div @click="openClose" class="l-main-title-close " style="fontSize:21px;">
                <i class="el-icon-s-fold"></i>
              </div>
              <div>
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }"> <span :style="{color:isWhite?'#333333':'#ffffff'}">首页</span> </el-breadcrumb-item>
                  <el-breadcrumb-item class="animated bounce delay-.5s" v-for="(item,index) of historyUrlListNow" :key="index"> <span :style="{color:isWhite?'#333333':'#ffffff'}">{{item.name}}</span></el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              
            </div>
            <!-- 用户的信息 -->
            <div class="l-main-title-right" :class="isWhite==true?'l-is-white':''">
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
                    <el-button style="border:0;font-size:14px;" class="l-color-back-white" :class="isWhite==true?'l-is-white':''" slot="reference">您好，<span style="fontWeight:600;" class="color:#333333;">{{userInfo.username}}</span> <i class="el-icon-arrow-down"></i> </el-button>
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
                    <el-button style="border:0;font-size:14px;" class="l-color-back-white" :class="isWhite==true?'l-is-white':''" slot="reference"> <i style="fontWeight:600;" class="el-icon-office-building "></i> {{userInfo.departName}}</el-button>
                  </el-popover>
              </div>
              <div style="cursor: pointer;">
                <i v-if="!isWhite" @click="isWhite = true" style="fontWeight:600;" class="el-icon-sunny"></i>
                <i v-if="isWhite" @click="isWhite =false "  style="fontWeight:600;" class="el-icon-moon"></i>
              </div>
            </div>
          </div>

          <!-- 历史标签 -->
          <div style="height:30px;" class="l-title-url l-color-back-white" :class="isWhite==true?'l-is-white l-history-url-white':'l-history-url-block'">
            <div v-for="(item,index) of historyUrlList" :key="index" class="l-histroy-item" :class="isWhite==true?(idx==index?'l-histroy-item-active l-histroy-item-white':'l-histroy-item-white'):(idx == index?'l-histroy-item-active l-histroy-item-block':'l-histroy-item-block')">
              {{item.name}}
            </div>
          </div>

        </div>
        

        <!-- main - main -->
        <div class="l-main-index" :class="isWhite==true?'l-is-white':''" :style="{width:indexWidth+'%',height:screenHeight-80+'px'}" style="boxSizing:border-box;">
          <transition name="fade"
            <router-view/>
          </transition>
        </div>
      </div>

    </el-container>
  </div>
</template>

<script>
import getMenList from '../store/router'
import * as stores from '../store/methods'
import {indexNav, updatePwd,downLoadImg} from '../api/request'
export default {
  components: {},
  data () {
    return {
      isCollapse: false,
      isWhite:true,
      historyUrlListNow:[],
      // 历史标签
      historyUrlList:[
        {
        indexs:"0-0",
        name:"首页",
        url:"/main"
      }
      ],
      idx:"",

      indexWidth:"100",
      menuList:[],
      default_active_index:"0-0",
      // 用户信息弹框
      visible:false,
      // 邀请码下载框
      visible1:false,
      userInfo:{},
      dialogFormVisible:false,
      screenHeight:document.documentElement.clientHeight || document.body.clientHeight
    };
  },
 created(){
   this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight
   this.userInfo = JSON.parse(this.$store.getters.get_yd_user_info);
   this.navList()
   var pathKey = sessionStorage.getItem("pathKey")
   if(pathKey){
     this.default_active_index=pathKey
   }
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
        var _this = this;
        var menuList = this.menuList;
        sessionStorage.setItem("pathKey",key)
        // 解析url
        var urls = stores.getMenUrl(menuList,key)
        sessionStorage.setItem("urls",urls)
        this.default_active_index = key;
        this.$router.push("/"+urls)

        //  获取所选侧边栏的对应的index 并判断之前是否已经选过这一项，如果选过则获取选过的index索引，并标记，如果没有选过添加进历史记录列表
        var historyListNow = []
        for(var item of menuList){
          item.list.forEach((items,index) =>{
            if(items.indexs == key){
              for(var i = 0; i < _this.historyUrlList.length; i++){
                if(_this.historyUrlList[i].indexs == key){
                  _this.idx = i
                  return
                }else{
                  if(i==_this.historyUrlList.length-1){
                    _this.historyUrlList.push(items);
                    _this.idx = _this.historyUrlList.length-1
                  }
                }
              }
            }
            if(items.indexs == key && items.indexs != "0-0"){
              historyListNow.push(item)
              historyListNow.push(items)
            }
          })
        }
        // 顶部title当前的所在位置
        this.historyUrlListNow = historyListNow

        
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
 mounted(){
   getMenList().then(res => {
     this.$router.options.routes[1].children=res
     this.$router.addRoutes(this.$router.options.routes);//调用addRoutes添加路由
   })
   var _this = this
    window.onresize = function () {
      var clientWidth = document.documentElement.clientWidth || document.body.clientWidth
      if(clientWidth<=1400){
        _this.isCollapse = true
      }else{
        _this.isCollapse = false
      }
     // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight // 窗口高度
    }
 },
 computed:{
   
 },
 watch: {
    isCollapse(newName, oldName) {
      this.indexWidth = 99.9;
      return 
    }
  }
}
</script>
<style scoped>
 
  .l-main-index{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #7d8185;
    overflow: auto;
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
  .l-title-url{
    height: 45px;
    width: 100%;
    padding: 0 30px 0 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    
  }
  .l-title-white{
    justify-content: space-between;
    border-bottom: 5px solid #f6f7f8;;
  }
  .l-title-block{
    justify-content: space-between;
    border-bottom: 5px solid #7d8185;
  }
  .l-history-url-white{
    padding:0 4px;
    border-left: 10px solid #ffffff;
    border-right: 10px solid #ffffff;
    border-bottom: 2px solid rgba(230, 230, 230, 1);
  }
  .l-history-url-block{
    padding:0 4px;
    border-left: 10px solid #7d8185;
    border-right: 10px solid #7d8185;
    overflow-x: scroll ;
  }
  .l-histroy-item{
    height: 22px;
    margin-right: 4px;
    padding: 0 8px;
    font-size: 12px;
    line-height: 22px;
    transition: all .5s;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .l-histroy-item-active{
    background-color: #42b983;
    color: #fff;
  }
  .l-histroy-item-active::before{
    content: "";
    width: 6px !important;
    height: 6px !important;
    margin: 0 3px;
    border-radius: 100%;
    display: block;
    border: 1px solid #fff;
    background: #fff;
  }
  .l-histroy-item-white{
    border: 1px solid rgba(230, 230, 230, 1);
  }
  .l-histroy-item-block{
    border: 1px solid #8d8185;
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
   .l-is-white{
    background: #fff;
    color: #333333;
  }
  .l-is-block{
    background: #7d8185;
    color: #ffffff;
    
  }
</style>