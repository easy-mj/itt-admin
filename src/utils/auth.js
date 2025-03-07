import { getItem, setItem } from '@/utils/storage'
import { ITT_TIME_STAMP, ITT_TOKEN_TIMEOUT_VALUE } from '@/constant'
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(ITT_TIME_STAMP)
}

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  return setItem(ITT_TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getTimeStamp()
  // 判断是否超时
  return currentTime - timeStamp > ITT_TOKEN_TIMEOUT_VALUE
}
