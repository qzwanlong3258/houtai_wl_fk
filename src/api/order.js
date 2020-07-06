import request from '@/utils/request'
import { GET_ORDER,SENT_ORDER } from '@/assets/constants/api'
//获取订单接口
export function getOrder(data) {
  return request({
    method: 'GET',
    url: `${GET_ORDER}?size=${data.pageSize}&page=${data.pageNum}&state=${data.state}`,
  })
}

//修改状态
export function sentOrder(data) {
  return request({
    method: 'POST',
    url: SENT_ORDER,
    data
  })
}
