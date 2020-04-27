import Vue from 'vue'
import Router from 'vue-router'
// import Yunda from '@/components/HelloWorld'
import store from '../store'//引入store
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:  resolve => {require(['../page/login'], resolve)},
    },
    {
      path: '/',
      name: 'index',
      meta:{
        isLogin:true
      },
      redirect: '/main',
      component:  resolve => {require(['../page/index'], resolve)},
      children:[
        {
          path: '/main',
          name:"main",
          meta:{
            isLogin:true
          },
          component:  resolve => {require(['../page/main'], resolve)},
        },
        {
          // 部门管理
          path: '/modules/yunda/depart',
          name:"depart",
          meta:{
            isLogin:true
          },
          component:  resolve => {require(['../page/modules/yunda/depart'], resolve)},
        },
        {
          // 
          path: '/modules/sys/role',
          name: 'role',
          component: resolve => {require(['../page/modules/sys/role'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // 站点管理
          path: '/modules/yunda/station',
          name: 'yunda/station',
          component: resolve => {require(['../page/modules/yunda/station'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // 管理员管理
          path: '/modules/sys/user',
          name: 'sys/user',
          component: resolve => {require(['../page/modules/sys/user'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // 司机管理
          path: '/modules/yunda/yfybdriver',
          name: 'yunda/yfybdriver',
          component: resolve => {require(['../page/modules/yunda/yfybdriver'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // 车辆管理
          path: '/modules/yunda/yfybvehicle',
          name: 'yunda/yfybvehicle',
          component: resolve => {require(['../page/modules/yunda/yfybvehicle'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // 人车匹配
          path: '/modules/yunda/yfybuserveh',
          name: 'yunda/yfybuserveh',
          component: resolve => {require(['../page/modules/yunda/yfybuserveh'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // 油卡限制管理
          path: '/modules/controlCard/yfyscontrolcard',
          name: 'controlCard/yfyscontrolcard',
          component: resolve => {require(['../page/modules/controlCard/yfyscontrolcard'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // 内部M1卡管理
          path: '/modules/card/yfysmicard',
          name: 'card/yfysmicard',
          component: resolve => {require(['../page/main'], resolve)},
          meta:{
            isLogin:true
          },
        },
        {
          // RFID卡管理
          path: '/modules/card/yfyscard',
          name: 'card/yfyscard',
          component: resolve => {require(['../page/main'], resolve)},
          meta:{
            isLogin:true
          },
        },
      // 油品管理
        // 进油管理
        {
          path: '/modules/oilRecord/yfyboilrecord',
          name: 'yfyboilrecord',
          component: resolve => {require(['../page/modules/oilRecord/yfyboilrecord'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 油品管理
        {
          path: '/modules/goods/yfysgoods',
          name: 'yfysgoods',
          component: resolve => {require(['../page/modules/goods/yfysgoods'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 调价记录
        {
          path: '/modules/goods/yfysgoodsinfo',
          name: 'yfysgoodsinfo',
          component: resolve => {require(['../page/modules/goods/yfysgoodsinfo'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 标签管理
        {
          path: '/modules/goods/yfystagtype0',
          name: 'yfystagtype0',
          component: resolve => {require(['../page/modules/goods/yfystagtype0'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 标签分配
        {
          path: '/modules/goods/yfystagtype1',
          name: 'yfystagtype1',
          component: resolve => {require(['../page/modules/goods/yfystagtype1'], resolve)},
          meta:{
            isLogin:true
          },
        },
      // 设备管理 
        // 油罐管理
        {
          path: '/modules/equipment/yfystank',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/equipment/yfystank'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 智能控制器
        {
          path: '/modules/equipment/yfyscontroller',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/equipment/yfyscontroller'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 油枪管理
        {
          path: '/modules/equipment/yfysgun',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/equipment/yfysgun'], resolve)},
          meta:{
            isLogin:true
          },
        },
      // 授权管理
        // 车辆计划授权管理
        {
          path: '/modules/auth/yfybvehauthtype0',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/auth/yfybvehauthtype0'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 司机计划授权管理
        {
          path: '/modules/auth/yfybvehauthtype1',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/auth/yfybvehauthtype1'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 临时授权管理
         {
          path: '/modules/oilOrder/yfytoilorder',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/oilOrder/yfytoilorder'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 车辆授权修改记录
        {
          path: '/modules/auth/yfybvehauthinfotype0',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/auth/yfybvehauthinfotype0'], resolve)},
          meta:{
            isLogin:true
          },
        },
        // 司机授权修改记录
        {
          path: '/modules/auth/yfybvehauthinfotype1',
          name: 'yfystag',
          component: resolve => {require(['../page/modules/auth/yfybvehauthinfotype1'], resolve)},
          meta:{
            isLogin:true
          },
        },
      ]
    },
    
    {
      path: '*',
      redirect: '/main',
      name: 'index',
      // component:  resolve => {require(['../page/main'], resolve)},
    },
  ]
})
// 全局路由路由守卫
router.beforeEach((to,from,next)=>{
  var tokens=localStorage.getItem('tokens');
  // console.log(to)
  // console.log(tokens)
  if(to.meta.isLogin){//判断是否需要登录
    // console.log(tokens)
      if (tokens) {
        store.commit('SET_TOKEN',localStorage.getItem("tokens"));
        store.commit('SET_USER_INFO',localStorage.getItem("yd_user_info"));
        store.commit('SET_USER_DEPT',localStorage.getItem("yd_user_dept"));
        next();
      }else{
          next({
              path:"/login"
          });
          
      }

  }else{
      next()
  }
});
export default router