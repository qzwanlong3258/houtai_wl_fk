import request from '@/utils/request'
import { GET_PRECHECK_LIST_OLD,SET_PRECHECK_PASS_OLD,SET_PRECHECK_FAIL_OLD ,SET_PRECHECK_FACE_OLD,SET_PRECHECK_BANK_OLD,SET_PRECHECK_FACE} from '@/assets/constants/api'

//获取用户列表接口
export function getCheckList(data) {
    return request({
        method: 'GET',
        url: `${GET_PRECHECK_LIST_OLD}?size=${data.pageSize}&page=${data.pageNum}&state=${data.state}&name=${data.name}`,
    })
}
//获取用户列表接口
export function getCheckListAll(data) {
  return request({
    method: 'GET',
    url: `${GET_PRECHECK_LIST_OLD}?size=${data.pageSize}&page=${data.pageNum}&state=${data.state}&bdate=${data.bdate}&edate=${data.edate}&name=${data.name}`,
  })
}

//审批通过
export function getPassList(data) {
    return request({
        method: 'POST',
        url: SET_PRECHECK_PASS_OLD,
        data
    })
}

//审批不通过
export function getFailList(data) {
    return request({
        method: 'POST',
        url: SET_PRECHECK_FAIL_OLD,
        data
    })
}
//审批不通过
export function passFace(data) {
  return request({
    method: 'POST',
    url: SET_PRECHECK_FACE_OLD,
    data
  })
}
//审批不通过
export function passBank(data) {
  return request({
    method: 'POST',
    url: SET_PRECHECK_BANK_OLD,
    data
  })
}
//获取用户列表接口
export function getface(data) {
  return request({
    method: 'GET',
    url: SET_PRECHECK_FACE,
  })
}

