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
          component: resolve => {require(['../page/main'], resolve)},
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