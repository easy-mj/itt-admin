import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 从环境变量读取
  timeout: 5000 // 超时时间5秒
})

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
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
