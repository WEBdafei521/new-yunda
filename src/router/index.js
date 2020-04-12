import Vue from 'vue'
import Router from 'vue-router'
// import Yunda from '@/components/HelloWorld'
import Yunda from '../page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'yunda',
      component: Yunda
    }
  ]
})
