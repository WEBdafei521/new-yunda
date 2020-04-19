import {Service} from '../Server'

export function getUserList(data) {
  return Service({
    url: 'sys/user/list?status=2&type=0',
    method:"post",
    params: data,
    
  })
}