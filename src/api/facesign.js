import request from '@/utils/request'
import { GET_FACESIGN_LIST,SET_FACESIGN_PASS,SET_FACESIGN_FAIL } from '@/assets/constants/api'

//获取贷款面签列表接口
export function getFaceList(data) {
    return request({
        method: 'GET',
        url: `${GET_FACESIGN_LIST}?pageSize=${data.pageSize}&pageNum=${data.pageNum}&loanerName=${data.loanerName}&loanQuota=${data.loanQuota}&facesignCity=${data.facesignCity}&faceStatus=${data.faceStatus}`
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
