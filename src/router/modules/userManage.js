import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage', // 需要与接口数据中的页面权限值对应
  meta: { title: 'user', icon: 'personnel' },
  children: [
    {
      path: '/user/manage',
      meta: { title: 'userManage', icon: 'personnel-manage' },
      component: () => import('@/views/user-manage')
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
}
