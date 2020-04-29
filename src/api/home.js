import request from '@/utils/request'
import { GET_HOME_DATA,GET_ECHAT_DATA ,GET_HOME_TOP,GET_MID_TOP,GET_MID_BANK,GET_HOME_USER} from '@/assets/constants/api'

//获取首页数据
export function getHomeData() {
    return request({
        method: 'GET',
        url: GET_HOME_DATA,
    })
}

//获取图形数据接口
export function getEchatData(data) {
    return request({
        method: 'POST',
        url: GET_ECHAT_DATA,
        data
    })
}
//获取顶部数据
export function getHomeTop(data) {
  return request({
    method: 'GET',
    url: GET_HOME_TOP,
  })
}
//获取顶部数据
export function getHomeMidTop(data) {
  return request({
    method: 'GET',
    url: GET_MID_TOP,
  })
}

//获取顶部数据
export function getHomeBank(data) {
  return request({
    method: 'GET',
    url: GET_MID_BANK,
  })
}

//获取顶部数据
export function getHomeUser(data) {
  return request({
    method: 'GET',
    url: GET_HOME_USER,
  })
}
