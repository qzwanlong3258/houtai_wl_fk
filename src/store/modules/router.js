import types from '../mutationTypes'
import { getUserPermission } from '../../api/login'
const routers = {
    state: {
      router: []
    },
    mutations: {
      [types.GET_USER_PERMISSION](state,data) {
        sessionStorage.setItem("router", JSON.stringify(data.router));
        for(let item of data.router) {
          state.router.push(item)
        }
      },
    },
    actions: {
       getRouter({ commit, state }, data){
         return new Promise((resolve,reject) => {
          getUserPermission(data).then(res => {
            commit(types.GET_USER_PERMISSION,res.data)
            resolve(res)
          }).catch(err=>{
            reject(err)
          })
         })
       },
    }
}

export default routers