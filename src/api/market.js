
import request from '@/utils/request'
import { GET_RECOMMENDCENT ,ADD_RECOMMENDCENT,PUT_RECOMMENDCENT,DELETE_RECOMMENDCENT,
  GET_POST,
  ADD_POST,
  DET_POST,
  GET_GOOD,
  ADD_GOOD,
  DET_GOOD,
  PUT_GOOD,
  GET_GOOD_DETAIL

} from '@/assets/constants/api'

//活动
export function getRecommendCenter(data) {
  return request({
    method: 'GET',
    url:  `${GET_RECOMMENDCENT}?size=${data.pageSize}&page=${data.pageNum}`,
  })
}
//
export function addRecommendCenter(data) {
  return request({
    method: 'POST',
    url: ADD_RECOMMENDCENT,
    data
  })
}
//
export function putRecommendCenter(data) {
  return request({
    method: 'POST',
    url: PUT_RECOMMENDCENT,
    data
  })
}
//
export function deleteRecommendCenter(data) {
  return request({
    method: 'POST',
    url: DELETE_RECOMMENDCENT,
    data
  })
}

//海报
export function getPost(data) {
  return request({
    method: 'GET',
    url:GET_POST  ,
  })
}

//
export function addPost(data) {
  return request({
    method: 'POST',
    url: ADD_POST,
    data
  })
}
//
export function detPost(data) {
  return request({
    method: 'POST',
    url: DET_POST,
    data
  })
}

//商品
export function getGood(data) {
  return request({
    method: 'GET',
    url:  `${GET_GOOD}?size=${data.pageSize}&page=${data.pageNum}&type=${data.type}` ,
  })
}

//
export function addGood(data) {
  return request({
    method: 'POST',
    url: ADD_GOOD,
    data
  })
}
//
export function putGood(data) {
  return request({
    method: 'POST',
    url: PUT_GOOD,
    data
  })
}
//
export function detGood(data) {
  return request({
    method: 'POST',
    url: DET_GOOD,
    data
  })
}

export function getGoodDetail(data) {
  return request({
    method: 'GET',
    url:`${GET_GOOD_DETAIL}?id=${data}`   ,
  })
}
