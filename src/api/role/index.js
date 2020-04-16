import {Service} from '../Server'
export function departList(data) {
  return Service({
    url: 'yunda/yfysdepart/getList/depart',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    method:"post",
    params: data
  })
}
export function getUserList(data) {
  return Service({
    url: "sys/role/list",
    method:"post",
    data: data,
    
  })
}
export function getMenuTree(data) {
  return Service({
    url: "sys/menu/list",
    method:"post",
    data: data,
    
  })
}
export function setUserInfo(data) {
  return Service({
    url: "sys/role/save",
    method:"post",
    data: data,
    
  })
}