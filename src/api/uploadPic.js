import request from '@/utils/request'
import { UPLOAD_PIC } from '@/assets/constants/api'

//增加城市
export function uploadPic(data) {
  return request({
    method: 'POST',
    url: UPLOAD_PIC,
    data
  })
}
