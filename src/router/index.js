import Vue from 'vue'
import Router from 'vue-router'
// import Yunda from '@/components/HelloWorld'
import store from '../store'//引入store

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