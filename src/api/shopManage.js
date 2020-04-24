import request from '@/utils/request'
import { GET_SHOP ,POST_SHOP} from '@/assets/constants/api'

//获取装企
export function getShop(data) {
  return request({
    method: 'GET',
    url:  `${GET_SHOP}?size=${data.pageSize}&page=${data.pageNum}&cid=${data.cid}&name=${data.name}&state=${data.state}`,
  })
}
//获取装企
export function getShopOne(data) {
  return request({
    method: 'GET',
    url:`${GET_SHOP}?size=${data.pageSize}&page=${data.pageNum}&name=${data.name}&state=${data.state}`,
  })
}
//审核
export function postShop(data) {
  return request({
    method: 'POST',
    url: POST_SHOP,
    data
  })
}
