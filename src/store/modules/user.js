import md5 from 'md5'
import { login } from '@/api/system'
import { setItem, getItem } from '@/utils/storage'
import { ITT_TOKEN } from '@/constant'
import router from '@/router'

/**
 * 用户模块
 */
export default {
  namespaced: true,
  state: () => {
    return {
      token: getItem(ITT_TOKEN) || ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(ITT_TOKEN, token)
    }
  },
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo

      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((data) => {
            context.commit('setToken', data.token)
            // 跳转页面
            router.push('/')
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
