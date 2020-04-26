import request from '@/utils/request'
import { GET_BANK_LIST_BK,ADD_BANK_BK,PUT_BANK_BK,DELETE_BANK_BK,UP_BANK_BK ,GET_BANK_USER_LIST_BK} from '@/assets/constants/api'

//获取首页数据
export function getList(data) {
  return request({
    method: 'GET',
    url:  `${GET_BANK_LIST_BK}?page=${data.page}&size=${data.size}&name=${data.name}`,
  })
}

//增加银行
export function addBank(data) {
  return request({
    method: 'POST',
    url: ADD_BANK_BK,
    data
  })
}
//修改银行
export function putBank(data) {
  return request({
    method: 'POST',
    url: PUT_BANK_BK,
    data
  })
}
//删除银行
export function deleteBank(data) {
  return request({
    method: 'POST',
    url: DELETE_BANK_BK,
    data
  })
}
//修改银行状态
export function upBank(data) {
  return request({
    method: 'POST',
    url: UP_BANK_BK,
    data
  })
}
//获取首页数据
export function getListUser(data) {
  return request({
    method: 'GET',
    url:  `${GET_BANK_USER_LIST_BK}?size=${data.size}&page=${data.page}&id=${data.id}`,
  })
}
