import request from '@/utils/request'
import { GET_SHOP ,POST_SHOP,GET_COUPON,ADD_COUPON,PUT_COUPON,GET_LABLE,POST_LABLE} from '@/assets/constants/api'

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

//获取装企下优惠券
export function getCoupon(data) {
  return request({
    method: 'GET',
    url:`${GET_COUPON}?dname=${data.name}`,
  })
}

//增加
export function addCoupon(data) {
  return request({
    method: 'POST',
    url: ADD_COUPON,
    data
  })
}
//修改
export function putCoupon(data) {
  return request({
    method: 'POST',
    url: PUT_COUPON,
    data
  })
}
//标签
export function getLable(data) {
  return request({
    method: 'GET',
    url:  `${GET_LABLE}?uuid=${data.uuid}`,
  })
}

//修改标签
export function postLable(data) {
  return request({
    method: 'POST',
    url: POST_LABLE,
    data
  })
}
