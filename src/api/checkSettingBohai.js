import request from '@/utils/request'
import { GET_PRECHECK_LIST,SET_PRECHECK_PASS,SET_PRECHECK_FAIL } from '@/assets/constants/api'

//获取用户列表接口
export function getCheckList(data) {
    return request({
        method: 'GET',
        url: `${GET_PRECHECK_LIST}?size=${data.pageSize}&page=${data.pageNum}&state=${data.state}`,
    })
}
//获取用户列表接口详情
export function getCheckListDetail(data) {
  return request({
    method: 'GET',
    url: `${GET_PRECHECK_LIST}?uuid=${data.uuid}&state=${data.state}`,
  })
}
//审批通过
export function getPassList(data) {
    return request({
        method: 'POST',
        url: SET_PRECHECK_PASS,
        data
    })
}
//审批不通过
export function getFailList(data) {
    return request({
        method: 'POST',
        url: SET_PRECHECK_FAIL,
        data
    })
}

