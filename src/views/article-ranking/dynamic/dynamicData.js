import i18n from '@/i18n'

const t = i18n.global.t

/**
 * 初始的列数据
 * 注意：
 *  如果导出的是固定的数组，则在导出的时候数据已经定死了，
 *  则后续国际化处理不会导致数据改变，就无法正常获取到国际化之后的数据，
 *  如何解决呢？这就需要导出函数，每次获取数据都会重新执行计算
 */
export default () => {
  return [
    {
      label: t('msg.article.ranking'),
      prop: 'ranking'
    },
    {
      label: t('msg.article.title'),
      prop: 'title'
    },
    {
      label: t('msg.article.author'),
      prop: 'author'
    },
    {
      label: t('msg.article.publicDate'),
      prop: 'publicDate'
    },
    {
      label: t('msg.article.desc'),
      prop: 'desc'
    },
    {
      label: t('msg.article.action'),
      prop: 'action'
    }
  ]
}
