import Vue from 'vue'
import Router from 'vue-router'
import getMenList from '../store/router'
import store from '../store'//引入store
import * as stores from '../store/methods'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)
const router = new Router({
  routes:[
    // 静态路由
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
          name:"main.html",
          meta:{
            isLogin:true
          },
          component:  resolve => {require(['../page/main'], resolve)},
        },
       
      ]
    },
    {
      path: '*',
      redirect: '/main',
      name: 'index',
    }
  ]
})
// 全局路由路由守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){//判断是否需要登录
      var tokens=sessionStorage.getItem('tokens');
      if (tokens) {
        store.commit('SET_TOKEN',sessionStorage.getItem("tokens"));
        store.commit('SET_USER_INFO',sessionStorage.getItem("yd_user_info"));
        store.commit('SET_USER_DEPT',sessionStorage.getItem("yd_user_dept"));
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