import {Service} from '../Server'
export function departList(data) {
  return Service({
    url: 'yunda/yfysdepart/getList/depart',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    method:"post",
    params: data
  })
}
export function updateRow(data) {
  return Service({
    url: "yunda/yfysdepart/update/station",
    method:"post",
    data: data,
    
  })
}
export function saveDepart(data) {
  return Service({
    url: "yunda/yfysdepart/save/depart",
    
    method:"post",
    data: data,
    
  })
}