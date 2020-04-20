import {Service} from '../Server'

export function getUserList(data) {
  return Service({
    url: 'sys/user/list?status=2&type=0',
    method:"post",
    params: data,
    
  })
}
export function getCarList(data) {
  return Service({
    url: 'yunda/yfybvehicle/list',
    method:"post",
    params: data,
    
  })
}
export function getUserCarList(data) {
  return Service({
    url: 'yunda/yfybuserveh/list',
    method:"post",
    params: data,
    
  })
}
export function fenpei(data,id) {
  return Service({
    url: 'yunda/yfybuserveh/save?userId='+id,
    method:"post",
    data: data,
    
  })
}
