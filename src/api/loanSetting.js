import request from '@/utils/request'
import { GET_LOAN_LIST,
    GET_LOAN_STAGELIST,
    SET_LOAN_NOPASS,
    SET_LOAN_PASS } from '@/assets/constants/api'
import { delNullUrl } from '@/utils/util.js'

//获取申请列表
export function getLoanList(data) {
    const url = delNullUrl({
        url: GET_LOAN_LIST,
        data
    })
    return request({
        method: 'GET',
        url,
    })
}

//按申请订单编号获取阶段计划列表

export function getStageList(data) {
    const url = delNullUrl({
        url: GET_LOAN_STAGELIST,
        data
    })
    return request({
        method: 'GET',
        url,
    })
}

//通过该阶段放款申请
export function setLoanPass(data) {
    return request({
        method: 'POST',
        url: SET_LOAN_PASS,
        data
    })
}

//不通过该阶段放款申请

export function setLoanNoPass(data) {
    return request({
        method: 'POST',
        url: SET_LOAN_NOPASS,
        data
    })
}