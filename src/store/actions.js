import {login} from "@/api/project";

/**
 * Created by administrator on 2019/4/23.
 */
// import {getUserInfo, logout} from "../api/user";
const actions = {
  login(content, user) {
    return new Promise(async function(resolve, reject) {
      console.log(content)
      try {
        const info = await login({
          password: user.password,
          name: user.name
        })
        console.log(info)
        if (info.code === 0) {
          content.commit('setLogin', true)
          localStorage.setItem('token', info.data.token)
          const user = {
            name: info.data.name,
            role: info.data.role
          }
          content.commit('setUserSession', user)
          localStorage.setItem('user', JSON.stringify(user))
          resolve(info.data)
        } else {
          content.commit('setLogin', false)
          content.commit('setUserSession', {})
          localStorage.setItem('user', JSON.stringify({}))
          reject('请登录')
        }
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
        store.commit('setLogin', false)
        store.commit('setUserSession', {})
        localStorage.setItem('user', JSON.stringify({}))
        localStorage.removeItem('token')
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
