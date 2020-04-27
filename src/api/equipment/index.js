import {Service} from '../Server'

export function getOilTankList(data) {
  return Service({
    url: "equipment/yfystank/list",
    method:"post",
    params: data,
    
  })
}
export function delOilTank(data) {
  return Service({
    url: "equipment/yfystank/delete",
    method:"post",
    data: data,
    
  })
}
// 获取油品信息
export function getOilTypeList(data) {
  return Service({
    url: "equipment/yfystank/getAddTankInfo",
    method:"post",
    data: data,
    
  })
}
// 添加油罐
export function saveOilStankInfo(data) {
  return Service({
    url: "equipment/yfystank/save",
    method:"post",
    data: data,
    
  })
}
// 修改油罐信息
export function updataOilStankInfo(data) {
  return Service({
    url: "equipment/yfystank/update",
    method:"post",
    data: data,
    
  })
}
// 智能控制器
export function getControlList(data) {
  return Service({
    url: "equipment/yfyscontroller/list",
    method:"post",
    params: data,
    
  })
}

// 添加控制器
export function saveControl(data) {
  return Service({
    url: "equipment/yfyscontroller/save",
    method:"post",
    data: data,
  })
}
// 修改控制器信息
export function updataControlInfo(data) {
  return Service({
    url: "equipment/yfyscontroller/update",
    method:"post",
    data: data,
  })
}

// 油枪管理 调价
export function updataPrice(data) {
  return Service({
    url: "equipment/yfysgun/updatePrice",
    method:"post",
    data: data,
  })
}
// 下发配置
export function setPeizhi(data) {
  return Service({
    url: "equipment/yfysgun/setConfig",
    method:"post",
    data: data,
  })
}
// 下发配置
export function getOilGunInfo(data) {
  return Service({
    url: "equipment/yfysgun/saveInfo",
    method:"post",
    data: data,
  })
}

