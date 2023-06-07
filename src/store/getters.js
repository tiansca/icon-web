/**
 * Created by administrator on 2019/4/24.
 */
const getters = {
  userName(state) {
    return state.user.name
  },
  userRole(state) {
    return state.user.role
  }
}

export default getters
