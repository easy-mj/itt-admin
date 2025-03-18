import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'permissionList', // 需要与接口数据中的页面权限值对应
  meta: { title: 'user', icon: 'personnel' },
  children: [
    {
      name: 'userPermission',
      path: '/user/permission',
      meta: { title: 'permissionList', icon: 'permission' },
      component: () => import('@/views/permission-list')
    }
  ]
}
