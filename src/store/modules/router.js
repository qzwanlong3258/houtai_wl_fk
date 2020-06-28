import types from '../mutationTypes'
import { getUserPermission } from '../../api/login'
const routers = {
    state: {
      router: []
    },
    mutations: {
      [types.GET_USER_PERMISSION](state,data) {
        let e = data.router.map(res=>{
          if(res.children.length ==0){
            return {
              path:res.uri,
              hidden:res.hidden==0?false:true,
              name:res.name,
              id:res.id,
              meta:{
                icon:res.icon ,
                description: res.description,
                title: res.name
              }
            }
          } else {
            return {
              path:res.uri,
              hidden:res.hidden==0?false:true,
              name:res.name,
              id:res.id,
              meta:{
                icon:res.icon ,
                description: res.description,
                title: res.name
              },
              children:res.children.map(items=>{
                return {
                  path:items.uri,
                  hidden:res.hidden==0?false:true,
                  name:items.name,
                  id:items.id,
                  meta:{
                    icon:items.icon ,
                    description: items.description,
                    title: items.name
                  }
                }
              })
            }
          }

        })
        console.log(e)
        sessionStorage.setItem("router", JSON.stringify(e));
        console.log(data.router)
        for(let item of e) {
          console.log(item)

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
