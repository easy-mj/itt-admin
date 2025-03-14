import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import getters from './getters'

export default createStore({
  getters,
  modules: {
    app, // 系统模块
    user, // 用户模块
    theme // 主题模块
  }
})
