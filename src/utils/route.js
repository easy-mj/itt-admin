import path from 'path'

/**
 * 获取所有的子级路由
 */
const getChildrenRoutes = (routes) => {
  const resultRoutes = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      resultRoutes.push(...route.children)
    }
  })
  return resultRoutes
}

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = (routes) => {
  // 获取所有的子级路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子级路由进行查重操作
  return routes.filter((route) => {
    // 根据 route 在 childrenRoutes 中进行查重，把所有重复的路由表剔除
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空
 */
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 根据 routes(filterRoutes) 数据，返回对应的 menu 规则数据
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足条件 meta && meta.title && meta.icon 的数据剔除
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta，直接 return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children，不存在 meta，调用 generateMenus
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children，存在 meta 或者 存在 children，存在 meta
    // 因为最终的 menu 需要进行跳转，此时需要合并 path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况
    let route = result.find((item) => {
      return item.path === routePath
    })
    // 当前路由未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 和 title 必须同时存在，生成 route 对象放入 result 数组
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 存在 children，存在 meta，继续迭代 children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
