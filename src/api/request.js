import {Service} from './Server'
export function loginIn(data) {
  return Service({
    url: '/sys/login',
    method:"post",
    params: data
  })
}
// 获取菜单栏
export function indexNav(data) {
  return Service({
    url: '/sys/menu/nav',
    method:"post"
  })
}
// 获取地图坐标定位
export function mainInfo(data) {
  return Service({
    url: '/yunda/yfysdepart/initMainInfo?type='+data,
    method:"post"
  })
}
// 更改密码
export function updatePwd(data) {
  return Service({
    url: 'sys/user/password',
    method:"post",
    params:data
  })
}
// 加油站列表
export function addOilList(data) {
  return Service({
    url: 'yunda/yfysdepart/getList/station',
    method:"post",
    params:data
  })
}
export function changeStatus(data) {
  return Service({
    url: 'yunda/yfysdepart/update/station',
    method:"post",
    data:data
  })
}

export function downLoadImg(data) {
  return Service({
    url: 'sys/gen/downloadImg',
    method:"post",
  })
}
// 获取油站编号
export function getStationNumber(data) {
  return Service({
    url: 'yunda/yfysdepart/get/departNo?type=2',
    method:"get",
  })
}
// 添加油站
export function addStation(data) {
  return Service({
    url: 'yunda/yfysdepart/save/station',
    method:"post",
    data:data
  })
}
