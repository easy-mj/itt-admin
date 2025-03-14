import { getItem, setItem } from '@/utils/storage'
import { ITT_THEME_COLOR, ITT_THEME_COLOR_DEFAULT } from '@/constant'

export default {
  namespaced: true,
  state: () => {
    return {
      themeColor: getItem(ITT_THEME_COLOR) || ITT_THEME_COLOR_DEFAULT
    }
  },
  mutations: {
    setThemeColor: (state, themeColor) => {
      state.themeColor = themeColor
      setItem(ITT_THEME_COLOR, themeColor)
    }
  },
  actions: {}
}
