import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'

/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/user',
    redirect: '/user/manage',
    meta: { title: 'user', icon: 'personnel' },
    component: layout,
    children: [
      {
        name: 'userManage',
        path: '/user/manage',
        meta: { title: 'userManage', icon: 'personnel-manage' },
        component: () => import('@/views/user-manage')
      },
      {
        name: 'userRole',
        path: '/user/role',
        meta: { title: 'roleList', icon: 'role' },
        component: () => import('@/views/role-list')
      },
      {
        name: 'userPermission',
        path: '/user/permission',
        meta: { title: 'permissionList', icon: 'permission' },
        component: () => import('@/views/permission-list')
      },
      {
        name: 'userInfo',
        path: '/user/info/:id',
        props: true,
        meta: { title: 'userInfo' },
        component: () => import('@/views/user-info')
      },
      {
        name: 'import',
        path: '/user/import',
        meta: { title: 'excelImport' },
        component: () => import('@/views/import')
      }
    ]
  },
  {
    path: '/article',
    redirect: '/article/ranking',
    component: layout,
    meta: { title: 'article', icon: 'article' },
    children: [
      {
        name: 'articleRanking',
        path: '/article/ranking',
        meta: { title: 'articleRanking', icon: 'article-ranking' },
        component: () => import('@/views/article-ranking')
      },
      {
        name: 'articleDetail',
        path: '/article/:id',
        meta: { title: 'articleDetail' },
        component: () => import('@/views/article-detail')
      },
      {
        name: 'articleCreate',
        path: '/article/create',
        meta: { title: 'articleCreate', icon: 'article-create' },
        component: () => import('@/views/article-create')
      },
      {
        name: 'articleEdit',
        path: '/article/edit/:id',
        meta: { title: 'articleEdit' },
        component: () => import('@/views/article-create')
      }
    ]
  }
]

/**
 * 公开路由表
 */
const publicRoutes = [
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
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
