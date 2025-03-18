/**
 * 处理列数据相关的内容
 * 1. 动态的列数据
 * 2. 被勾选的动态列数据
 * 3. table 的列数据
 */
import { ref, watch } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'
import dymicData from './dynamicData'

// 动态的列数据
export const dynamicData = ref(dymicData())

// 国际化
watchSwitchLanguage(() => {
  dynamicData.value = dymicData()
  initSelectDynamicValue()
})

// 被勾选的动态列数据
export const selectDynamicValue = ref([])
const initSelectDynamicValue = () => {
  // 默认全部勾选
  selectDynamicValue.value = dynamicData.value.map((item) => item.prop)
}
initSelectDynamicValue()

// table 的列数据
export const tableColumns = ref([])
const getTableColumns = (val) => {
  tableColumns.value = []
  // 遍历列数据，从中判断当前列是否是被勾选的
  const selectData = dynamicData.value.filter((item) => {
    return val.includes(item.prop)
  })
  tableColumns.value.push(...selectData)
}

watch(
  selectDynamicValue,
  (val) => {
    getTableColumns(val)
  },
  {
    immediate: true
  }
)
