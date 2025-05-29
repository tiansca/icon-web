import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import routes from './router'
// import axios from './utils/request'
import loading from './utils/loading.js' // 引入loading
import Bus from './utils/bus.js'/// mitt 总线程引入
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {getUserInfo, refreshTokenApi} from "@/api/project";
import config from "@/config";
import {setCookie} from "@/utils";
// import iconsVue from '@element-plus/icons-vue'


// eslint-disable-next-line no-unused-vars
// const getUser = async() => {
//   try {
//     const res = await store.dispatch('getUserInfo')
//     store.commit('setPath', res.name)
//     console.log(res)
//   } catch (e) {
//     location.replace(`//user.tiansc.top/#/login?from=${location.href}`)
//   }
// }
// 解析url hash中的参数
const getHash = () => {
  let hash = location.hash.slice(1)
  // 删除url中的token参数
  if (hash.indexOf('?') && hash.split('?')[1]) {
    const paramsArray = hash.split('?')[1].split('&')
    return paramsArray.reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      acc[key] = value
      if (key === 'token') {
        hash = hash.replace(cur, '')
        location.hash = hash
      }
      return acc
    }, {})
  }
  return {}
}

const init = async () => {
  console.log(localStorage.getItem('token'))
  // 读取url hash中的token参数
  const hashParams = getHash()
  if (hashParams.token) {
    localStorage.setItem('token', hashParams.token)
  }
  if (localStorage.getItem('token')) {
    store.commit('setLogin', true)
  }
  // if (document.cookie.indexOf("token") !== -1) {
  //   store.commit('setLogin', true)
  // }
  // 用户信息
  try {
    const {data} = await getUserInfo()
    // 设置coockie islogin 为true
    setCookie("islogin", true, data.exp)
    console.log(data.username)
    store.commit("setUserSession", {
      name: data.username,
      role: data.roleList,
      permissions: data.permissionList,
      id: data.userid
    })
    if (data.exp - Date.now() < 1000 * 60 * 60 * 24 * 2.8) {
      refreshToken()
    }
  } catch{
    console.log(config)
    window.location.replace(config.authUrl + "#/login" + '?redirect=' + encodeURIComponent(window.location.href))
    return
  }

  const app = createApp(App)
  app.use(store)
  app.use(routes)
  app.use(loading)
  app.use(ElementPlus)
  app.config.globalProperties.$bus = Bus
  app.mount('#app')
  // app.component('iconsVue', iconsVue)
}
init()


// 刷新token
async function refreshToken() {
  const res = await refreshTokenApi()
  console.log(res)
  // 缓存token
  localStorage.setItem('token', res.token)
}

