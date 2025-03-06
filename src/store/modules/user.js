import md5 from 'crypto-js/md5'
import { login } from '@/api/system'

/**
 * 用户模块
 */
export default {
  namespaced: true,
  state: () => {
    return {}
  },
  mutations: {},
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo

      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
