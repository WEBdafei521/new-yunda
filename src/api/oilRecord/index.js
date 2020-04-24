import {Service} from '../Server'
export function departList(data) {
  return Service({
    url: 'yunda/yfysdepart/getList/depart',
    headers: {'content-type': 'pplication/x-www-form-urlencoded; charset=UTF-8'},
    method:"post",
    params: data
  })
}
export function getOilRecordList(data) {
  return Service({
    url: "oilRecord/yfyboilrecord/list",
    headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    method:"post",
    params: data,
    
  })
}
export function delOilRecord(data) {
  return Service({
    url: "oilRecord/yfyboilrecord/delete",
    method:"post",
    data: data,
    
  })
}
export function saveOilRecord(data) {
  return Service({
    url: "oilRecord/yfyboilrecord/save",
    method:"post",
    data: data,
    
  })
}
export function getOilList(data) {
  return Service({
    url: "equipment/yfystank/list",
    method:"post",
    params: data,
    
  })
}
export function updataOilInfo(data) {
  return Service({
    url: "oilRecord/yfyboilrecord/update",
    method:"post",
    data: data,
    
  })
}
