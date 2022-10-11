/**
 * Created by administrator on 2019/4/23.
 */
const mutations = {
  setUserSession(state, value) {
    state.user.name = value.name || ''
    state.user.id = value.id || ''
  },
  setPath(state, value) {
    state.path = value
  },
  setWidth(state, value) {
    state.width = value
  },
  setHeight(state, value) {
    state.height = value
  },
  setLogin(state, value) {
    state.isLogin = value
  }
}

export default mutations
