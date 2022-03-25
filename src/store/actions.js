/**
 * Created by administrator on 2019/4/23.
 */
// import {getUserInfo, logout} from "../api/user";
const actions = {
  getUserInfo(content) {
    return new Promise(async function(resolve, reject) {
      console.log(content)
      try {
        resolve()
        // const info = await getUserInfo()
        // if (info.code === 0) {
        //   content.commit('setUserSession', info.data || {})
        //   resolve(info.data)
        // } else {
        //   content.commit('setUserSession', {})
        //   reject('请登录')
        // }
      } catch (e) {
        reject('请登录')
      }
    })
  },
  logout(store) {
    console.log(store)
    return new Promise(async function(resolve, reject) {
      // const info = await logout()
      try {
      //   if (info.code === 0) {
      //     store.commit('setUserSession', {})
          resolve()
      //   } else {
      //     reject('退出失败！')
      //   }
      } catch (e) {
        reject('退出失败！')
      }
    })
  }
}

export default actions
