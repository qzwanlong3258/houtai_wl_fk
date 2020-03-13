import axios from "axios"
import {Message, Loading} from "element-ui"
import {getCookie} from "./cookie"
import router from "../router"
import store from "../store/index.js"

axios.defaults.timeout = 50000
// axios.defaults.baseURL = "http://192.168.3.25:8088"
//   axios.defaults.baseURL = "http://www.feiaizn.com:8088"
axios.defaults.baseURL = "/yunliuyan"

//请求拦截器
// axios.interceptors.request.use(
//   config => {
//     const token = getCookie("token")
//     config.data = JSON.stringify(config.data)
//     config.headers = {
//       "Content-Type": "application/json"
//     }
//     config.params = {}
//     if(token) {
//         config.params = {'token':token}
//     }
//     return config
//   },
//   error => {
//     return Message.error(error)
//   }
// );


//响应拦截器

axios.interceptors.response.use(
  response => {
    if (response.data.code === 1024) {
      store.dispatch(clearToken).then(res => {
        if (res.code === 0) {
          router.push({
            path: "./login"
          })
        }
      })
    }
    return response
  },
  error => {
    return Message.error(error)
  }
);

export default function request({
                                  method = "GET",
                                  url = "",
                                  params = {},
                                  data = {}
                                } = {}) {
  let loadingInstance = Loading.service({
    fullscreen: true,
    text: "请稍后",
    background: "rgba(0,0,0,.7)",
    spinner: "el-icon-loading"
  });
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params,
      data
    }).then(res => {
      loadingInstance.close()
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        Message.error(`请求失败：${res.data.message}`)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
