// modules/yunda/yfybdriver
// 管理员管理
import {Service} from '../Server'

// 获取司机列表
export function getDriverList(data) {
  return Service({
    url: "sys/user/list",
    method:"post",
    params: data,
    
  })
}
// 删除司机
export function delDriver(data) {
  return Service({
    url: "sys/user/delete",
    method:"post",
    params: data,
    
  })
}
// 检查用户名
export function checkUserName(data) {
  return Service({
    url: "sys/user/check",
    method:"post",
    params: data,
    
  })
}
// 添加用户
export function addDriverUser(data) {
  return Service({
    url: "sys/user/save",
    method:"post",
    data: data,
    
  })
}
// 修改司机用户信息
export function updateDriverUser(data) {
  return Service({
    url: "sys/user/update",
    method:"post",
    data: data,
    
  })
}

