/**
 * Created by administrator on 2019/3/20.
 */
import axios from 'axios'
import config from '@/config.js'

const service = axios.create({
  baseURL: config.baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  withCredentials: true
  // timeout: 5000 // request timeout
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
