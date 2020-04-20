// 管理员管理
import {Service} from '../Server'
export function departList(data) {
  return Service({
    url: 'yunda/yfysdepart/getList/depart',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    method:"post",
    params: data
  })
}
// 获取管理员列表
export function getMangeList(data) {
  return Service({
    url: "sys/user/list",
    method:"post",
    params: data,
    
  })
}
// 管理员管理 删除用户
export function delectItem(data) {
  return Service({
    url: "sys/user/delete",
    method:"post",
    data: data,
    
  })
}
// 获取管理页面角色列表
export function getRoleList(data) {
  return Service({
    url: "sys/role/select",
    method:"post",
    data: data,
    
  })
}
// 获取管理页面部门列表
export function getDepartList(data) {
  return Service({
    url: "yunda/yfysdepart/list?type=0",
    method:"post",
    data: data,
    
  })
}
// 添加用户
export function addRoleSave(data){
  return Service({
    url:"sys/user/save",
    method:"post",
    data:data,
  })
}
// 添加用户
export function updateRoleSave(data){
  return Service({
    url:"sys/user/update",
    method:"post",
    data:data,
  })
}