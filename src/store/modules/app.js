import { getItem, setItem } from '@/utils/storage'
import { ITT_LANGUAGE } from '@/constant'
/**
 * 系统模块
 */
export default {
  namespaced: true,
  state: () => {
    return {
      sidebarOpened: true,
      language: getItem(ITT_LANGUAGE) || 'zh'
    }
  },
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, language) {
      state.language = language
      setItem(ITT_LANGUAGE, language)
    }
  }
}
