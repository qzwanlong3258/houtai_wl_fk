import types from '../mutationTypes'
import { getUserLogin, clearUserToken } from '../../api/login'
import { setCookie, delCookie,getCookie } from '../../utils/cookie'

const user = {
    state: {
        nickName: '',
        roleId: '',
        roleName: '',
        icon: '',
        username: '',
        phone: '',
        email: '',
        loanDetail: {"renovationStatus":0,"pwPhone":"188****2951","idCard":"36042819960719371X","familyIncome":"","preStatus":3,"addName":"zhaoyue","monthStill":"","applyAmount":654646,"cardNum":0,"bank":"中国银行","renovationSchedule":"0","marriage":0,"term":24,"id":1,"renovationType":0,"preRemake":"联系方式不对","faceStatus":1,"sex":1,"tobalBorrPhone":"","tobalBorrJob":"","applyPerson":"后端老王","tobalBorrName":"","phone":"18879252951","name":"于龙栋","faceCity":"河北省-唐山市-古冶区","job":"","applyDate":"2019-09-27"}
    },
    mutations: {
        [types.GET_USER_INFOR](state,data) {
            const tempState = state
            setCookie("user", JSON.stringify(data));
            let seesionData = getCookie('user')
            for(let item in tempState) {
                if(data.hasOwnProperty(item)){
                    tempState[item] = seesionData[item]
                }
            }
            state = tempState
        },
        [types.CLEAR_USER_INFO](state) {
            const tempState = {
                nickName: '',
                roleId: '',
                roleName: '',
                icon: '',
                username: '',
                phone: '',
                email: ''
            }
            state = tempState
        },
    },
    actions: {
        login({ commit, state }, data) {
            return new Promise((resolve,reject) => {
                getUserLogin(data).then(res=>{
                    console.log(res)
                    commit(types.GET_USER_INFOR, res.data)
                    if(res.data.token) {
                        setCookie('token',res.data.token)
                    }
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        clearToken({ commit, state }) {
            return new Promise((resolve,reject) => {
                delCookie('router')
                delCookie('user')
                clearUserToken().then(res=>{
                    delCookie('token')
                    commit(types.CLEAR_USER_INFO)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}

export default user
