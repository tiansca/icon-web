import { createApp, reactive } from 'vue'
import myLoad from '@/components/loading.vue'
import Bus from "./bus";

const msg = reactive({
  show: false
})
const loadingBox = document.createElement('div')
document.body.appendChild(loadingBox)
// const $loading = createApp(myLoad, {msg}).mount(loadingBox)
const $loading = createApp(myLoad, {msg})
$loading.config.globalProperties.$bus = Bus
$loading.mount(loadingBox)
const load = {
  show() { // 控制显示loading的方法
    msg.show = true
    document.body.appendChild($loading.$el)
  },

  hide() { // 控制loading隐藏的方法
    msg.show = false
  }
}

export default {
  install(app) {
    // console.log(app);
    // Vue.prototype.$http = axios
    app.config.globalProperties.$loading = load
  }
}
