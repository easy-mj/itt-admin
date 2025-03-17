import request from '@/utils/request'

/**
 * 获取所有角色
 */
export const getRoleList = () => {
  return request({
    url: '/role/list'
  })
}
