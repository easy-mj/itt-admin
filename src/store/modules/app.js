/**
 * 系统模块
 */
export default {
  namespaced: true,
  state: () => {
    return {
      sidebarOpened: true
    }
  },
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
