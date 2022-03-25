// import Vue from 'vue'
import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
window.console.log(getters)
// Vue.use(Vuex)

export const store = createStore({
  state,
  mutations,
  getters,
  actions
})
