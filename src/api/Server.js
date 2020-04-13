import axios from 'axios'
import router from '../router'
import * as stores from '../store/methods'
import { Message, Loading } from 'element-ui'

let loadingInstance = null //这里是loading
export const Service = axios.create({
  timeout: 7000, // 请求超时时间

  // baseURL:  'http://you.yunfeiyang.com:8080/',
  // 跨域代理
  baseURL:  '/api',

  method: 'post',

  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  // 添加请求头部信息 token
  if (localStorage.getItem('tokens')) {
    config.headers.token = localStorage.getItem('tokens');
  }
  loadingInstance = Loading.service({
    lock: true,
    text: 'loading...'
  })
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  if(response.data.code===401){
    sessionStorage.removeItem('tokens')
    localStorage.removeItem('tokens')
    router.push({path:'/login'});
    Message({
      message: '网络错误' + response.data.msg,
      type: 'error',
      duration: 3 * 1000
    })
  }
  loadingInstance.close()
  return response.data
}, error => {
  const msg = error.Message !== undefined ? error.Message : '';
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  // 推出登录
  stores.LOGIN_OUT()
  router.push({path:'/login'});
  loadingInstance.close()
  return Promise.reject(error)
})