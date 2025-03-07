import md5 from 'md5'
import { login, getUserInfo } from '@/api/system'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { ITT_TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

/**
 * 用户模块
 */
export default {
  namespaced: true,
  state: () => {
    return {
      token: getItem(ITT_TOKEN) || '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(ITT_TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
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
            // 保存登录时间
            setTimeStamp()
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息动作
     */
    async getUserInfo(context) {
      try {
        const result = await getUserInfo()
        context.commit('setUserInfo', result)
        return result
      } catch (error) {
        return error
      }
    },
    /**
     * 退出登录动作
     */
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
