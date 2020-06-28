import { getCookie } from './utils/cookie'
import store from './store'
import router from './router'
const whiteList = ['/404','/login']
if (window.sessionStorage.getItem("router")) {
    var permissionRouter = JSON.parse(window.sessionStorage.getItem("router"))
}else{
    var permissionRouter = store.state.routers.router
}
export default router.beforeEach((to,from,next)=>{
    // console.log(permissionRouter)
    permissionRouter.forEach(function(item){
        item.children && item.children.forEach(function(value){
            item.path && value.path && whiteList.indexOf(`${item.path}/${value.path}`)===-1 && whiteList.push(`${item.path}/${value.path}`)
            !item.path && value.path && whiteList.indexOf(`/${value.path}`)===-1 && whiteList.push(`/${value.path}`)
        })
    })
    if(to.matched.some( m => m.meta.auth)){
        if(to.path == "/login"){
            next();
        }else{
            if(whiteList.indexOf(to.path) > -1){
                if(getCookie('token')){
                    next()
                }else{
                    next('/login')
                }
            }else {
                next('/404')
            }
        }
    }else{
        next('/404')
    }
})
