import request from '@/utils/request'
import { GET_MEMBER_LIST ,GET_TESTONETEST_LIST, UPDATE_TESTONETEST} from '@/assets/constants/api'

//获取用户列表接口
export function getMemberList(data) {
    return request({
        method: 'GET',
        url: `${GET_MEMBER_LIST}?pageSize=${data.pageSize}&pageNum=${data.pageNum}&realname=${data.realname}&invitor=${data.invitor}&sex=${data.sex}`,
    })
}
//获取测一测问题
export function getTestOneTest(data) {
  return request({
    method: 'GET',
    url: GET_TESTONETEST_LIST,
  })
}

//新增问题
export function addTestOneTest(data) {
  return request({
    method: 'POST',
    url: ADD_TESTONETEST,
    data
  })
}
//修改问题
export function updateTestOneTest(data) {
  return request({
    method: 'POST',
    url: UPDATE_TESTONETEST,
    data
  })
}
//删除问题
export function deleteTestOneTest(data) {
  return request({
    method: 'POST',
    url: UPDATE_TESTONETEST,
    data
  })
}

