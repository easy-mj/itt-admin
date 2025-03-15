import { ITT_THEME_COLOR } from '@/constant'
import variables from '@/style/variables.module.scss'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

/**
 * 快捷访问
 */
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => {
    return {
      ...variables,
      ...state.theme,
      ...generateColors(getItem(ITT_THEME_COLOR))
    }
  },
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  themeColor: (state) => state.theme.themeColor
}
export default getters
