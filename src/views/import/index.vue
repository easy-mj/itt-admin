<template>
  <upload-excel :onSuccess="handleSuccess"></upload-excel>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { userBatchImport } from '@/api/user-manage'
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './helper'

const router = useRouter()
const i18n = useI18n()

/**
 * 筛选数据
 */
const generateUserData = (results) => {
  const users = []
  results.forEach((item) => {
    const user = {}

    Object.keys(item).forEach((key) => {
      const newKey = USER_RELATIONS[key]
      // 针对时间格式的字段需要特殊处理
      if (newKey === 'openTime') {
        user[newKey] = formatDate(item[key])
        return
      }
      user[newKey] = item[key]
    })

    users.push(user)
  })
  return users
}

/**
 * 上传成功回调
 */
const handleSuccess = async ({ results }) => {
  try {
    const users = generateUserData(results)
    await userBatchImport(users)
    ElMessage.success(`${users.length}${i18n.t('msg.excel.importSuccess')}`)
    router.push({ name: 'userManage' })
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
