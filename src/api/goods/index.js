import {Service} from '../Server'
export function departList(data) {
  return Service({
    url: 'yunda/yfysdepart/getList/depart',
    headers: {'content-type': 'pplication/x-www-form-urlencoded; charset=UTF-8'},
    method:"post",
    params: data
  })
}
export function getOilList(data) {
  return Service({
    url: "goods/yfysgoods/list",
    headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    method:"post",
    params: data,
    
  })
}
export function delOilType(data) {
  return Service({
    url: "goods/yfysgoods/delete",
    method:"post",
    data: data,
    
  })
}
export function saveOilType(data) {
  return Service({
    url: "goods/yfysgoods/save",
    method:"post",
    data: data,
  })
}
export function getGun(data) {
  return Service({
    url: "goods/yfysgoods/getGunsByGoods//"+data,
    method:"post",
  })
}
export function updataPrice(data) {
  return Service({
    url: "goods/yfysgoods/modifyPrice",
    method:"post",
    data: data,
  })
}

// 获取调价记录
export function getModifyPriceRecord(data) {
  return Service({
    url: "goods/yfysgoodsinfo/list",
    method:"post",
    params: data,
  })
}
// 标签管理
export function getLabelList(data) {
  return Service({
    url: "goods/yfystag/list",
    method:"post",
    params: data,
  })
}
export function delLabel(data) {
  return Service({
    url: "goods/yfystag/delete",
    method:"post",
    data: data,
  })
}
export function saveLabel(data) {
  return Service({
    url: "goods/yfystag/save",
    method:"post",
    data: data,
  })
}
// 标签分配 获取油品列表
export function getOilTypeList(data) {
  return Service({
    url: "goods/yfysgoods/getGoods",
    method:"post",
    data: data,
  })
}
export function savePiPei(data) {
  return Service({
    url: "goods/yfystag/saveGoodTag",
    method:"post",
    params: data,
  })
}

