/**
 * Created by administrator on 2019/3/20.
 */
import axios from 'axios'
import config from '@/config.js'
import { store } from '@/store'

const service = axios.create({
  baseURL: config.baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  withCredentials: true
  // timeout: 5000 // request timeout
})
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['authorization'] = localStorage.getItem('token') || ''
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      console.log(res)
      if (res.data === '请登录' || res.message === '请登录') {
        store.commit('setLogin', false)
      }
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
