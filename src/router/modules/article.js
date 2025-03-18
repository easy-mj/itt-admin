import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking', // 需要与接口数据中的页面权限值对应
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/ranking',
      meta: { title: 'articleRanking', icon: 'article-ranking' },
      component: () => import('@/views/article-ranking')
    },
    {
      name: 'articleDetail',
      path: '/article/:id',
      meta: { title: 'articleDetail' },
      component: () => import('@/views/article-detail')
    }
  ]
}
