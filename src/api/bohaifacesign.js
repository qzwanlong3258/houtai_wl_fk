import request from '@/utils/request'
import { GET_FACESIGN_LIST,SET_FACESIGN_PASS,SET_FACESIGN_FAIL } from '@/assets/constants/api'

//获取贷款面签列表接口
export function getFaceList(data) {
    return request({
        method: 'GET',
        url: `${GET_FACESIGN_LIST}?size=${data.pageSize}&page=${data.pageNum}&state=${data.state}`
    })
}
//获取贷款面签列表接口
export function getFaceListDetail(data) {
  return request({
    method: 'GET',
    url: `${GET_FACESIGN_LIST}?uuid=${data.uuid}&state=${data.state}`,
  })
}
//面签成功
export function getPassDesign(data) {
    return request({
        method: 'POST',
        url: SET_FACESIGN_PASS,
        data
    })
}

//面签失败
export function getFailDesign(data) {
    return request({
        method: 'POST',
        url: SET_FACESIGN_FAIL,
        data
    })
}
