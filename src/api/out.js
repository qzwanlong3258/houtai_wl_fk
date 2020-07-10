import request from '@/utils/request'
import { ORDER_OUT } from '@/assets/constants/api'
import  axios from 'axios'
//获取订单接口
export function orderOut(data) {
  if(data.bdate){
    // return request({
    //   method: 'GET',
    //   url:  `${ORDER_OUT}?state=${data.state}&bdate=${data.bdate}&edate=${data.edate}`,
    // })

    return axios({
      url: `${ORDER_OUT}?state=${data.state}&bdate=${data.bdate}&edate=${data.edate}`,
    }).then(res => {
      return res.data.path
    })
  } else {
    // return request({
    //   method: 'GET',
    //   url:  `${ORDER_OUT}?state=${data.state}`,
    // })
    return axios({
      url: `${ORDER_OUT}?state=${data.state}`,
      data:{state:data.state}
    }).then(res => {
      return res.data.path
    })
  }

}


