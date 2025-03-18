import { publicRoutes, privateRoutes } from '@/router'

/**
 * 权限路由模块
 */
export default {
  namespaced: true,
  state: () => {
    return {
      // 路由表：初始时拥有的路由表
      routes: publicRoutes
    }
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 始终在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限数据筛选路由
     * @params {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      const routes = [] // 筛选之后，获取到的需要通过 add Route 进行添加的路由表数组

      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 所有不匹配的路由，全部进入404的路由配置，注意：该配置必须要在所有路由指定之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)

      return routes
    }
  }
}
