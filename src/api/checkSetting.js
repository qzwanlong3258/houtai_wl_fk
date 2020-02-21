import request from '@/utils/request'
import { GET_PRECHECK_LIST,SET_PRECHECK_PASS,SET_PRECHECK_FAIL } from '@/assets/constants/api'

//获取用户列表接口
export function getCheckList(data) {
    return request({
        method: 'GET',
        url: `${GET_PRECHECK_LIST}?pageSize=${data.pageSize}&pageNum=${data.pageNum}&loanerName=${data.loanerName}&loanQuota=${data.loanQuota}&facesignCity=${data.facesignCity}&oderStatus=${data.oderStatus}`,
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

