import variables from '@/style/variables.module.scss'

/**
 * 快捷访问
 */
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  themeColor: (state) => state.theme.themeColor
}
export default getters
