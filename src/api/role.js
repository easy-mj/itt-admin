import request from '@/utils/request'

/**
 * 获取所有角色
 */
export const getRoleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取当前角色对应的权限
 */
export const getRolePermissions = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 为角色分配权限
 */
export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
