import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Layout,
      redirect: '/feiai',
      children: [{
        path: 'feiai',
        name: '非爱首页',
        component: () => import('@/pages/FeiAi/Home'),
        meta: { auth: true, description:'首页',title:'首页',icon: 'iconshouye'},
    },
    {
      path: 'baseInfo',
      name: '基本信息',
      component: () => import('@/pages/FeiAi/BaseInfor'),
      meta: { auth: true, description:'基本信息',title:'基本信息'},
      hidden: true
    }

      ]
    },
    {
      path: '/baseSetting',
      name: '基础设置',
      component: Layout,
      redirect: '/baseSetting/role',
      meta: { auth: true, description:'基础设置',title:'基础设置',icon: 'iconshezhi'},
      children: [
        {
          path: 'role',
          name: '角色赋权',
          component: () => import('@/pages/FeiAi/BaseSetting/RoleSetting'),
          meta: { auth: true, description:'角色赋权',title:'角色赋权',icon: 'iconjiaoseguanli'},
        },
        {
          path: 'mem',
          name: '成员管理',
          component: () => import('@/pages/FeiAi/BaseSetting/MemberSetting'),
          meta: { auth: true, description:'成员管理',title:'成员管理',icon: 'iconchengyuanguanli'},
        },
        {
          path: 'bank',
          name: '银行管理',
          component: () => import('@/pages/FeiAi/BaseSetting/BankSetting'),
          meta: { auth: true, description:'银行管理',title:'银行管理',icon: 'iconyinhang'},
        },
        {
          path: 'stage',
          name: '阶段设置',
          component: () => import('@/pages/FeiAi/BaseSetting/StageSetting'),
          meta: { auth: true, description:'阶段设置',title:'阶段设置',icon: 'iconrenshengjieduan'},
        },
        {
          path: 'type',
          name: '拍照类型',
          component: () => import('@/pages/FeiAi/BaseSetting/PhoneType'),
          meta: { auth: true, description:'拍照类型',title:'拍照类型',icon: 'iconchuangxinchanpin'},
        },
        {
          path: 'city',
          name: '城市管理',
          component: () => import('@/pages/FeiAi/BaseSetting/CitySetting'),
          meta: { auth: true, description:'城市管理',title:'城市管理',icon: 'iconrenshengjieduan'},
        },
        {
          path: 'news',
          name: '新闻管理',
          component: () => import('@/pages/FeiAi/BaseSetting/NewsSetting'),
          meta: { auth: true, description:'新闻管理',title:'新闻管理',icon: 'iconchuangxinchanpin'},
        },
        {
          path: 'homeStyle',
          name: '首页主题管理',
          component: () => import('@/pages/FeiAi/BaseSetting/HomeStyle'),
          meta: { auth: true, description:'首页主题管理',title:'首页主题管理',icon: 'iconrenshengjieduan'},
        }
      ]
    },
    {
      path: '/userInfor',
      name: '用户管理',
      component: Layout,
      redirect: '/userInfor/appleUser',
      meta: { auth: true, description:'用户管理',title:'用户管理',icon: 'iconyonghuxinxi1'},
      children: [
        {
          path: 'appletUser',
          name: '用户信息',
          component: () => import('@/pages/FeiAi/UserInfor/appletUser'),
          meta: { auth: true, description:'用户信息',title:'用户信息',icon: 'iconyonghuxinxi'},
        },
        {
          path: 'loginLog',
          name: '登录日志',
          component: () => import('@/pages/FeiAi/UserInfor/loginLog'),
          meta: { auth: true, description:'登录日志',title:'登录日志',icon: 'iconyonghuxinxi'},
        },
        {
          path: 'testonetest',
          name: '测一测',
          component: () => import('@/pages/FeiAi/UserInfor/TestOneTest'),
          meta: { auth: true, description:'测一测',title:'测一测',icon: 'icontuijian'},
        },
        {
          path: 'inviteInfo',
          name: '邀请信息',
          component: () => import('@/pages/FeiAi/UserInfor/InviteInfo'),
          meta: { auth: true, description:'邀请信息',title:'邀请信息',icon: 'icontuijian'},
        },
        {
          path: 'memberStatus',
          name: '会员状态',
          component: () => import('@/pages/FeiAi/UserInfor/MemberStatus'),
          meta: { auth: true, description:'会员状态',title:'会员状态',icon: 'icontuijian'},
        },
        {
          path: 'measureHome',
          name: '约量房',
          component: () => import('@/pages/FeiAi/UserInfor/measureHome'),
          meta: { auth: true, description:'约量房',title:'约量房',icon: 'icontuijian'},
        }
      ]
    },
    {
      path: '/checkSetting',
      name: '审批管理',
      component: Layout,
      redirect: '/checkSetting/loanSetting',
      meta: { auth: true, description:'审批管理',title:'审批管理',icon: 'icondkw_daikuan-'},
      children: [
        {
          path: 'loanSetting',
          name: '贷款预审',
          component: () => import('@/pages/FeiAi/CheckSetting/LoanSetting'),
          meta: { auth: true, description:'贷款预审',title:'贷款预审',icon: 'iconshenheguanli'},
          hidden: true
        }
      ]
    },
    {
      path: '/bohaiCheckSetting',
      name: '渤海银行审批管理',
      component: Layout,
      redirect: '/bohaiCheckSetting/loanSetting',
      meta: { auth: true, description:'渤海银行审批管理',title:'渤海银行审批管理',icon: 'icondkw_daikuan-'},
      children: [
        {
          path: 'loanSetting',
          name: '渤海银行贷款预审',
          component: () => import('@/pages/FeiAi/bohaiCheckSetting/LoanSetting'),
          meta: { auth: true, description:'渤海银行贷款预审',title:'渤海银行贷款预审',icon: 'iconshenheguanli'},
          hidden: true
        }
      ]
    },
    {
      path: '/faceStting',
      name: '面签管理',
      component: Layout,
      redirect: '/faceStting/faceLoan',
      meta: { auth: true, description:'面签管理',title:'面签管理',icon: 'icontuijian'},
      children: [
        {
          path: 'faceLoan',
          name: '贷款面签',
          component: () => import('@/pages/FeiAi/FaceSetting/FaceLoan'),
          meta: { auth: true, description:'贷款面签',title:'贷款面签',icon: 'iconqianzi'},
        }
      ]
    },
    {
      path: '/bohaiFaceSetting',
      name: '渤海银行面签管理',
      component: Layout,
      redirect: '/bohaiFaceSetting/faceLoan',
      meta: { auth: true, description:'渤海银行面签管理',title:'渤海银行面签管理',icon: 'icontuijian'},
      children: [
        {
          path: 'faceLoan',
          name: '渤海银行贷款面签',
          component: () => import('@/pages/FeiAi/bohaiFaceSetting/FaceLoan'),
          meta: { auth: true, description:'渤海银行贷款面签',title:'渤海银行贷款面签',icon: 'iconqianzi'},
        }
      ]
    },
    {
      path: '/shopManage',
      name: '装企管理',
      component: Layout,
      redirect: '/ShopManage/ShopCheck',
      meta: { auth: true, description:'装企管理',title:'装企管理',icon: 'icontuijian'},
      children: [
        {
          path: 'shopCheck',
          name: '装企审核',
          component: () => import('@/pages/FeiAi/ShopManage/ShopCheck'),
          meta: { auth: true, description:'装企审核',title:'装企审核',icon: 'iconqianzi'},
        }
      ]
    },
    {
      path: '/BankManageAll',
      name: '银行',
      component: Layout,
      redirect: '/BankManageAll/BankManage',
      meta: { auth: true, description:'银行',title:'银行',icon: 'icontuijian'},
      children: [
        {
          path: 'BankManage',
          name: '银行管理',
          component: () => import('@/pages/FeiAi/BankManageAll/BankManage'),
          meta: { auth: true, description:'银行管理',title:'银行管理',icon: 'iconqianzi'},
        }
      ]
    },
    {
      path: '/MarketManage',
      name: '营销管理',
      component: Layout,
      redirect: '/MarketManage/recommend',
      meta: { auth: true, description:'营销管理',title:'营销管理',icon: 'icontuijian'},
      children: [
        {
          path: 'recommemdCenter',
          name: '活动管理',
          component: () => import('@/pages/FeiAi/MarketManage/recommendCenter'),
          meta: { auth: true, description:'活动管理',title:'活动管理',icon: 'iconqianzi'},
        },
        {
          path: 'distributionCenter',
          name: '分销中心',
          component: () => import('@/pages/FeiAi/MarketManage/distributionCenter'),
          meta: { auth: true, description:'分销中心',title:'分销中心',icon: 'iconqianzi'},
        },
        {
          path: 'mall',
          name: '积分商城',
          component: () => import('@/pages/FeiAi/MarketManage/mall'),
          meta: { auth: true, description:'积分商城',title:'积分商城',icon: 'iconqianzi'},
        }
      ]
    },

    {
      path: '/loanSetting',
      name: '放款管理',
      component: Layout,
      redirect: '/loanSetting/loanList',
      meta: { auth: true, description:'放款管理',title:'放款管理',icon: 'icontuijian'},
      children: [
        {
          path: 'loanList',
          name: '放款申请',
          component: () => import('@/pages/FeiAi/loanSetting/loanList'),
          meta: { auth: true, description:'放款申请',title:'放款申请',icon: 'iconfangkuanxinxi'},
        },
        {
          path: 'loanDetail',
          name: '申请详情',
          component: () => import('@/pages/FeiAi/loanSetting/loanDetail'),
          meta: { auth: true, description:'申请详情',title:'申请详情',icon: 'iconfangkuanxinxi'},
        },
      ]
    },
    {
      path: '/bankManage',
      name: '放款管理',
      component: Layout,
      redirect: '/loanSetting/loanList',
      meta: { auth: true, description:'放款管理',title:'放款管理',icon: 'icontuijian'},
      children: [
        {
          path: 'loanList',
          name: '放款申请',
          component: () => import('@/pages/FeiAi/loanSetting/loanList'),
          meta: { auth: true, description:'放款申请',title:'放款申请',icon: 'iconfangkuanxinxi'},
        },
        {
          path: 'loanDetail',
          name: '申请详情',
          component: () => import('@/pages/FeiAi/loanSetting/loanDetail'),
          meta: { auth: true, description:'申请详情',title:'申请详情',icon: 'iconfangkuanxinxi'},
        },
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/pages/Login'),
      meta: {auth: true}
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404'),
      meta: {auth: true}
    }
  ]
})
