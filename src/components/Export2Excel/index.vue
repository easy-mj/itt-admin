<template>
  <el-dialog
    width="30%"
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @closed="handleClose"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">{{ $t('msg.excel.close') }}</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="exportLoading"
        >
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLanguage } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { dateFilter } from '@/filter'
import { USER_RELATIONS } from './helper'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
const i18n = useI18n()

// 指定默认文件名
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName

watchSwitchLanguage(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

// 处理关闭弹窗
const closeDialog = () => {
  emits('update:modelValue', false)
}
const handleClose = () => {
  closeDialog()
}

// 点击确定
const exportLoading = ref(false)

/**
 * 使用 export_json_excel 的时候，需要的数据格式必须是二维数组
 * 格式：[['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
 * 其中 ['', '', '', ''] 代表每行数据，里面的每个元素代表当前行每列的数据
 */
const formatJSON = (headers, rows = []) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色字段需要特殊处理（角色是个数组）
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((r) => r.title))
      }
      // 时间字段需要特殊处理
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}

const handleConfirm = async () => {
  exportLoading.value = true
  try {
    // 获取数据
    const result = await getUserManageAllList()
    const allUsers = result.list
    // 导入工具包(异步导入)
    const excelUtils = await import('@/utils/Export2Excel')
    // 格式化数据
    const data = formatJSON(USER_RELATIONS, allUsers)
    // 导出
    excelUtils.export_json_to_excel({
      // 表头
      header: Object.keys(USER_RELATIONS),
      // 数据
      data,
      // 文件名称
      filename: excelName.value || exportDefaultName
    })
    closeDialog()
  } catch (error) {
  } finally {
    exportLoading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
