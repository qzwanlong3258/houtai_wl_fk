import request from '@/utils/request'
import { GET_HOME_DATA,GET_ECHAT_DATA } from '@/assets/constants/api'

//获取首页数据
export function getHomeData() {
    return request({
        method: 'GET',
        url: GET_HOME_DATA,
    })
}

//获取图形数据接口
export function getEchatData(data) {
    return request({
        method: 'POST',
        url: GET_ECHAT_DATA,
        data
    })
}