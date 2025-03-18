import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
import store from '@/store'
import userManage from './modules/userManage'
import roleList from './modules/roleList'
import permissionList from './modules/permissionList'
import article from './modules/article'
import articleCreate from './modules/articleCreate'

/**
 * 私有路由表
 */
export const privateRoutes = [
  userManage,
  roleList,
  permissionList,
  article,
  articleCreate
]
console.log(privateRoutes)

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        meta: { title: 'profile', icon: 'personnel' },
        component: () => import('@/views/profile')
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export const resetRouters = () => {
  if (store.getters.userInfo?.permission?.menus) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
