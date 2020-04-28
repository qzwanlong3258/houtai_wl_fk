import request from '@/utils/request'
import { GET_FACESIGN_LIST_OLD,SET_FACESIGN_PASS_OLD,SET_FACESIGN_FAIL_OLD } from '@/assets/constants/api'


//获取用户列表接口
export function getFaceList(data) {
  return request({
    method: 'GET',
    url: `${GET_FACESIGN_LIST_OLD}?size=${data.pageSize}&page=${data.pageNum}&state=${data.state}&name=${data.name}`,
  })
}
//获取用户列表接口
export function getFaceListAll(data) {
  return request({
    method: 'GET',
    url: `${GET_FACESIGN_LIST_OLD}?size=${data.pageSize}&page=${data.pageNum}&state=${data.state}&bdate=${data.bdate}&edate=${data.edate}&name=${data.name}`,
  })
}

//面签成功
export function getPassDesign(data) {
    return request({
        method: 'POST',
        url: SET_FACESIGN_PASS_OLD,
        data
    })
}

//面签失败
export function getFailDesign(data) {
    return request({
        method: 'POST',
        url: SET_FACESIGN_FAIL_OLD,
        data
    })
}
