import request from '@/utils/request'
import { GET_ROLE_LIST,
    GET_PERMISSION_LIST,
    SET_ROLE_ADD,
    SET_ROLE_EXIT,
    SET_ROLE_DELETE,
    GET_ADMIN_LIST,
    SET_ADMIN_ADD,
    GET_ADMIN_ROLE,
    SET_ADMIN_EXIT,
    SET_ADMIN_DELETE,
    GET_BANK_LIST,
    SET_BANK_ADD,
    SET_BANK_EXIT,
    SET_BANK_DELETE,
    GET_PERIOD_LIST,
    SET_PERIOD_ADD,
    SET_PERIOD_EXIT,
    SET_PERIOD_DELETE,
    GET_POT_LIST,
    SET_POT_ADD,
    SET_POT_EXIT,
    SET_POT_DELETE,
    GET_CITY_LIST,
   GET_BUTTON_LIST,
  ADD_CITY,
UPDATE_CITY,
  ADD_BUTTON,
  UPDATE_BUTTON,
  DELETE_BUTTON,
  DELETE_CITY,
  GET_NEWS_LIST,
  ADD_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
  UP_NEWS,
  DETAIL_NEWS
} from '@/assets/constants/api'

//获取角色列表
export function getRoleList(data) {
    return request({
        method: 'GET',
        url: GET_ROLE_LIST,
        data
    })
}


//获取角色权限接口
export function getPermission() {
    return request({
        method: 'GET',
        url: GET_PERMISSION_LIST
    })
}

//添加角色接口
export function setRoleAdd(data) {
    return request({
        method: 'POST',
        url: SET_ROLE_ADD,
        data
    })
}

//编辑角色
export function setRoleExit(data) {
    return request({
        method: 'POST',
        url: SET_ROLE_EXIT,
        data
    })
}

//删除角色
export function setRoleDelete(data) {
    return request({
        method: 'POST',
        url: SET_ROLE_DELETE,
        data
    })
}

//获取成员列表
export function getAdminList(params) {
    return request({
        method: 'GET',
        url: GET_ADMIN_LIST,
        params
    })
}

//添加成员接口
export function setAdminAdd(data) {
    return request({
        method: 'POST',
        url: SET_ADMIN_ADD,
        data
    })
}

//获取角色接口
export function getAdminRole() {
    return request({
        method: 'GET',
        url: GET_ADMIN_ROLE
    })
}

//编辑成员接口
export function setAdminExit(data) {
    return request({
        method: 'POST',
        url: SET_ADMIN_EXIT,
        data
    })
}

//删除成员接口
export function setAdminDelete(data) {
    return request({
        method: 'POST',
        url: SET_ADMIN_DELETE,
        data
    })
}

//获取银行列表
export function getBankList(data) {
    const url = `${GET_BANK_LIST}?page=${data.page}&size=${data.size}${parseInt(data.type)?'&type='+data.type:''}`
    return request({
        method: 'GET',
        url,
    })
}

//添加银行
export function setBankAdd(data) {
    return request({
        method: 'POST',
        url: SET_BANK_ADD,
        data
    })
}

//编辑银行
export function setBankExit(data) {
    return request({
        method: 'POST',
        url: SET_BANK_EXIT,
        data
    })
}

//删除银行
export function setBankDelete(data) {
    return request({
        method: 'POST',
        url: SET_BANK_DELETE,
        data
    })
}


//获取阶段列表
export function getPeriodList(data) {
    const url = `${GET_PERIOD_LIST}?page=${data.page}&size=${data.size}`
    return request({
        method: 'POST',
        url,
    })
}

//添加阶段
export function setPeriodAdd(data) {
    return request({
        method: 'POST',
        url: SET_PERIOD_ADD,
        data
    })
}

//编辑阶段
export function setPeriodExit(data) {
    return request({
        method: 'POST',
        url: SET_PERIOD_EXIT,
        data
    })
}

//删除阶段
export function setPeriodDelete(data) {
    return request({
        method: 'POST',
        url: SET_PERIOD_DELETE,
        data
    })
}

//获取拍照类型列表
export function getPotList(data) {
    const url = `${GET_POT_LIST}?page=${data.page}&size=${data.size}`
    return request({
        method: 'POST',
        url,
    })
}

//添加拍照类型
export function setPotAdd(data) {
    return request({
        method: 'POST',
        url: SET_POT_ADD,
        data
    })
}

//编辑拍照类型
export function setPotExit(data) {
    return request({
        method: 'POST',
        url: SET_POT_EXIT,
        data
    })
}

//删除拍照类型
export function setPotDelete(data) {
    return request({
        method: 'POST',
        url: SET_POT_DELETE,
        data
    })
}

//城市列表及按钮
export function getCityList() {
  return request({
    method: 'GET',
    url: GET_CITY_LIST
  })
}
//所有按钮
export function getButtonList() {
  return request({
    method: 'GET',
    url: GET_BUTTON_LIST
  })
}
//增加城市
export function addCity(data) {
  return request({
    method: 'POST',
    url: ADD_CITY,
    data
  })
}

//修改城市
export function updateCity(data) {
  return request({
    method: 'POST',
    url: UPDATE_CITY,
    data
  })
}
//增加按钮

export function addButton(data) {
  return request({
    method: 'POST',
    url: ADD_BUTTON,
    data
  })
}
//修改按钮

export function updateButton(data) {
  return request({
    method: 'POST',
    url: UPDATE_BUTTON,
    data
  })
}

//删除按钮
export function deleteButton(data) {
  return request({
    method: 'POST',
    url: DELETE_BUTTON,
    data
  })
}
//删除城市
export function deleteCity(data) {
  return request({
    method: 'POST',
    url: DELETE_CITY,
    data
  })
}
//新闻列表
export function getNewsList(data) {
  return request({
    method: 'GET',
    url: GET_NEWS_LIST
  })
}
//新增新闻
export function addNews(data) {
  return request({
    method: 'POST',
    url: ADD_NEWS,
    data
  })
}
//修改新闻
export function updateNews(data) {
  return request({
    method: 'POST',
    url: UPDATE_NEWS,
    data
  })
}

//删除新闻
export function deleteNews(data) {
  return request({
    method: 'POST',
    url: DELETE_NEWS,
    data
  })
}

//置顶新闻
export function upNews(data) {
  return request({
    method: 'POST',
    url: UP_NEWS,
    data
  })
}
//新闻列表
export function detailNews(data) {
  return request({
    method: 'GET',
    url: DETAIL_NEWS
  })
}
