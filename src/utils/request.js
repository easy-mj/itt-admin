import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 从环境变量读取
  timeout: 5000 // 超时时间5秒
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 统一注入 token 的实现
    const token = store.getters.token
    if (token) {
      // 检测 token 是否超时
      if (isCheckTimeout()) {
        // 退出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data

    // 需要判断请求是否成功
    if (success) {
      return data // 成功后返回数据
    } else {
      // 失败（请求成功，业务失败）则给出消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 请求失败，如404、500等
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token 过期，需要执行退出登录
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
