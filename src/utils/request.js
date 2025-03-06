import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 从环境变量读取
  timeout: 5000 // 超时时间5秒
})

export default service
