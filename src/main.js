import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import routes from './router'
// import axios from './utils/request'
import loading from './utils/loading.js' // 引入loading
import Bus from './utils/bus.js'/// mitt 总线程引入
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
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

const init = async () => {
  // await getUser()
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

