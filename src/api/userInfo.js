import request from '@/utils/request'
import { GET_MEMBER_LIST } from '@/assets/constants/api'

//获取用户列表接口
export function getMemberList(data) {
    return request({
        method: 'GET',
        url: `${GET_MEMBER_LIST}?pageSize=${data.pageSize}&pageNum=${data.pageNum}&realname=${data.realname}&invitor=${data.invitor}&sex=${data.sex}`,
    })
}

