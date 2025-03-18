import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'roleList', // 需要与接口数据中的页面权限值对应
  meta: { title: 'user', icon: 'personnel' },
  children: [
    {
      name: 'userRole',
      path: '/user/role',
      meta: { title: 'roleList', icon: 'role' },
      component: () => import('@/views/role-list')
    }
  ]
}
