import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleCreate', // 需要与接口数据中的页面权限值对应
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/create',
      meta: { title: 'articleCreate', icon: 'article-create' },
      component: () => import('@/views/article-create')
    },
    {
      name: 'articleEdit',
      path: '/article/edit/:id',
      meta: { title: 'articleEditor' },
      component: () => import('@/views/article-create')
    }
  ]
}
