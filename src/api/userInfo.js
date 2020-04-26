import request from '@/utils/request'
import { GET_MEMBER_LIST ,GET_TESTONETEST_LIST,ADD_TESTONETEST, UPDATE_TESTONETEST,DELETE_TESTONETEST,ADD_TESTONETEST_ITEM,UPDATE_TESTONETEST_ITEM,DELETE_TESTONETEST_ITEM,GET_USER_INFORLOG,POST_USER_INFORLOG,
  GET_USER_LIST ,GET_USER_INVITE, GET_MEMBER_STATUS
} from '@/assets/constants/api'

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
    url: DELETE_TESTONETEST,
    data
  })
}
//新增问题选项
export function addTestOneTestItem(data) {
  return request({
    method: 'POST',
    url: ADD_TESTONETEST_ITEM,
    data
  })
}
//修改问题选项
export function updateTestOneTestItem(data) {
  return request({
    method: 'POST',
    url: UPDATE_TESTONETEST_ITEM,
    data
  })
}
//删除问题选项
export function deleteTestOneTestItem(data) {
  return request({
    method: 'POST',
    url: DELETE_TESTONETEST_ITEM,
    data
  })
}
//删除问题选项
export function get(data) {
  return request({
    method: 'POST',
    url: DELETE_TESTONETEST_ITEM,
    data
  })
}
//获取用户信息
export function getUserInfo(data) {
  return request({
    method: 'GET',
    url:`${GET_USER_INFORLOG}?size=${data.pageSize}&page=${data.pageNum}`,
  })
}
//修改用户信息
export function postUserInfo(data) {
  return request({
    method: 'POST',
    url: POST_USER_INFORLOG,
    data
  })
}

//获取用户信息
export function getUserList(data) {
  return request({
    method: 'GET',
    url:`${GET_USER_LIST}?page=${data.page}&size=${data.size}&name=${data.name}`,
  })
}
//获取用户信息
export function getUserInvite(data) {
  return request({
    method: 'GET',
    url:`${GET_USER_INVITE}?page=${data.page}&size=${data.size}&userid=${data.id}`,
  })
}
//获取会员信息

export function getMemberStatus(data) {
  return request({
    method: 'GET',
    url:`${GET_MEMBER_STATUS}?page=${data.page}&size=${data.size}&name=${data.name}`,
  })
}


