import request from '@/utils/request'
import { GET_UER_LOGIN, CLEAR_USER_TOKEN, GET_USER_PERMISSION,SET_UPDATA_CODE,SET_UPDATA_PHONE,SET_UPDATA_AVATAR,SET_UPDATA_PASSWORD } from '@/assets/constants/api'
import {getCookie} from '@/utils/cookie'
//登录
export function getUserLogin(data) {
    return request({
        method: 'POST',
        url: GET_UER_LOGIN,
        data,
    })
}
//退出
export function clearUserToken() {
    return request({
        method: 'POST',
        url: CLEAR_USER_TOKEN,
        data: {
           token: getCookie('token')
        }
    })
}

//获取角色权限
export function getUserPermission({id=''}={}){
    return request({
        method: 'GET',
        url: `${GET_USER_PERMISSION}?id=${id}`
    })
}

//修改密码接口
export function changeUserPassword(data) {
    return request({
        method: 'POST',
        url: SET_UPDATA_PASSWORD,
        data: {
            ...data,
            token: getCookie('token')
        }
    })
}

//获取验证码
export function getCode(data) {
    return request({
        method: 'POST',
        url: SET_UPDATA_CODE,
        data,
    })
}

//修改手机接口
export function changeUserPhone(data) {
    return request({
        method: 'POST',
        url: SET_UPDATA_PHONE,
        data,
    })
}

//修改头像
export function changeUserAvatar(data) {
    return request({
        method: 'POST',
        url: SET_UPDATA_AVATAR,
        data,
    })
}
