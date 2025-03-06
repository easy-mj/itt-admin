/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // value 分为两种情况：基本数据类型、复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)

  // 这里处理 data 是否为 JSON 格式的数据，非 JSON 格式的数据会转换异常，直接返回原始数据即可
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
