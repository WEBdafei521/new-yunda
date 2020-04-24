// modules/yunda/yfybdriver
// 管理员管理
import {Service} from '../Server'

// 获取司机列表
export function getCarList(data) {
  return Service({
    url: "yunda/yfybvehicle/list",
    method:"post",
    params: data,
    
  })
}
// 删除司机
export function delCar(data) {
  return Service({
    url: "yunda/yfybvehicle/delete",
    method:"post",
    data: data,
    
  })
}
// 添加车辆
export function addCar(data) {
  return Service({
    url: "yunda/yfybvehicle/save",
    method:"post",
    data: data,
    
  })
}
// 选择油品
export function getOilList(data) {
  return Service({
    url: "yunda/yfydoil/list",
    method:"post",
    params: data,
    
  })
}
// 修改油品信息
export function updataOilInfo(data) {
  return Service({
    url: "yunda/yfybvehicle/update",
    method:"post",
    data: data,
    
  })
}



