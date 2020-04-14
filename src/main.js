// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入animate.css
import animated from 'animate.css' // npm install animate.css --save安装，在引入 
Vue.use(animated)


import store from './store'//引入store
import { Container,Message, MessageBox,} from 'element-ui'
Vue.config.productionTip = false;
// 全局背景颜色
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.prototype.$message=Message
Vue.prototype.Message=MessageBox
Vue.prototype.$alert=MessageBox.alert
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$prompt=MessageBox.prompt

// 全局配置注册Element ui组件
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
