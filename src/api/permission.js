import request from '@/utils/request'

/**
 * 获取所有权限
 */
export const getPermissionList = () => {
  return request({
    url: '/permission/list'
  })
}
