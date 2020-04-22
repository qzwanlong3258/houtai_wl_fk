module.exports = {
    //登录
    GET_UER_LOGIN: '/admin/login',
    CLEAR_USER_TOKEN: '/admin/logout',
    GET_USER_PERMISSION: '/admin/permission',

    //首页
    GET_HOME_DATA: '/admin/home/data',
    GET_ECHAT_DATA: '/admin/home/pdata',

    //基本信息修改
    SET_UPDATA_PASSWORD:'/person/update/password',
    SET_UPDATA_CODE: '/person/update/code',
    SET_UPDATA_PHONE: '/person/update/phone',
    SET_UPDATA_AVATAR: '/person/update/avator',

  SET_UPDATA_USER:'/user/updateUserInfo',
  GET_USER_CONTENT:'/user/loadUserInfo',

    //基础设置
    GET_ROLE_LIST: '/role/list', //获取角色列表
    GET_PERMISSION_LIST: '/permission/list', //获取角色权限
    SET_ROLE_ADD: '/role/add', //添加角色接口
    SET_ROLE_EXIT: '/role/update', //编辑角色接口
    SET_ROLE_DELETE: '/role/delete', //删除角色接口

    GET_ADMIN_LIST: '/admin/list', //获取成员列表
    SET_ADMIN_ADD: '/admin/add', //添加成员
    GET_ADMIN_ROLE: '/role/list', //获取角色
    SET_ADMIN_EXIT: '/admin/update', //编辑成员
    SET_ADMIN_DELETE: '/admin/delete', //删除成员

    GET_BANK_LIST: '/bank/list', //获取银行列表
    SET_BANK_ADD: '/bank/insert', //添加银行
    SET_BANK_EXIT: '/bank/update', //编辑银行
    SET_BANK_DELETE: '/bank/delete', //删除银行
    //GET_BANK_LIST: '/bank/list', //获取银行列表
  //  SET_BANK_ADD: '/bank/add', //添加银行
   // SET_BANK_EXIT: '/bank/update', //编辑银行
   // SET_BANK_DELETE: '/bank/delete', //删除银行

  GET_CITY_LIST:'/city/loadAllCity',//城市及按钮
  GET_BUTTON_LIST:'/city/loadButton',//所有按钮
  ADD_CITY:'/city/insertCity',//增加城市
  UPDATE_CITY:'/city/updateCity',//修改城市

  ADD_BUTTON:'/city/appendButton',//增加按钮
  UPDATE_BUTTON:'/city/updateButton',//修改按钮
  DELETE_BUTTON:'/city/deleteButton',//删除按钮
  DELETE_CITY:'/city/deleteCity',//删除城市

  GET_NEWS_LIST:'/news/loadNews',//新闻列表
  ADD_NEWS:'/news/insertNews',//增加新闻
  UPDATE_NEWS:'/news/updateNews',//编辑新闻
  DELETE_NEWS:'/news/deleteNews',//删除新闻
  UP_NEWS:'/news/topNews',//置顶新闻
  DETAIL_NEWS:'/news/loadNewsDetails',//新闻详情

  GET_HOME_STYLE:'/picture/loadPicture',
  ADD_HOME_STYLE:'/picture/insertPicture',
  UPDATE_HOME_STYLE:'/picture/updatePicture',
  DELETE_HOME_STYLE:'/picture/deletePicture',



   //阶段管理
   GET_PERIOD_LIST: '/period/query', //获取阶段列表
   SET_PERIOD_ADD: '/period/insert', //新增阶段
   SET_PERIOD_EXIT: '/period/update', //编辑阶段
   SET_PERIOD_DELETE: '/period/delete', //删除阶段

  //拍照位置管理
  GET_POT_LIST: '/pot/query', //获取阶段列表
  SET_POT_ADD: '/pot/insert', //新增阶段
  SET_POT_EXIT: '/pot/update', //编辑阶段
  SET_POT_DELETE: '/pot/delete', //删除阶段

    //用户管理
    GET_MEMBER_LIST: '/member/list',  //获取用户列表接口
    GET_TESTONETEST_LIST: '/test/loadTest',  //获取测一测问题
    ADD_TESTONETEST:'/test/insertTest',//增加问题
    UPDATE_TESTONETEST:'/test/updateTest',//修改问题
    DELETE_TESTONETEST:'/test/deleteTest',//删除问题

    //审批管理
    // GET_PRECHECK_LIST: '/precheck/list', //获取贷款预审列表
    GET_PRECHECK_LIST: '/info/loadInfo', //获取贷款预审列表
    SET_PRECHECK_PASS: '/info/updateState', //审批通过
    SET_PRECHECK_FAIL: '/info/updateState', //审批不通过

    GET_FACESIGN_LIST: '/info/loadInfo', //获取贷款面签列表
    SET_FACESIGN_PASS: '/info/updateState', //面签成功
    SET_FACESIGN_FAIL: '/info/updateState', //面签失败

    //放款管理
    GET_LOAN_LIST: '/precheck/list', //获取放款申请列表
    GET_LOAN_STAGELIST: '/loan/queryOne', //按申请订单编号获取阶段计划列表
    SET_LOAN_NOPASS: '/loan/noPass', //阶段不通过
    SET_LOAN_PASS: '/loan/pass', //阶段通过
  //上传照片
    UPLOAD_PIC:'/ftp/upload'
}
