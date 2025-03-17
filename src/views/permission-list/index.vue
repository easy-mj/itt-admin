<!-- prettier-ignore -->
<template>
  <div class="permission-list">
    <el-card>
      <el-table
        :data="allPermissions"
        style="width: 100%"
        border
        v-loading="permissionListLoading"
        element-loading-text="Loading..."
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="permissionName" :label="$t('msg.permission.name')" width="180"></el-table-column>
        <el-table-column prop="permissionMark" :label="$t('msg.permission.mark')" width="180"></el-table-column>
        <el-table-column prop="permissionDesc" :label="$t('msg.permission.desc')"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'
import { getPermissionList } from '@/api/permission'

/**
 * 权限分级：
 * 1. 一级权限为页面权限：permissionMark 对应路由名称
 * 2. 二级权限为功能权限：permissionMark 对应功能权限表
 */

// 权限列表
const allPermissions = ref([])
const permissionListLoading = ref(false)
const fetchPermissionList = async () => {
  permissionListLoading.value = true
  try {
    const result = await getPermissionList()
    allPermissions.value = result
  } catch (error) {
  } finally {
    permissionListLoading.value = false
  }
}
fetchPermissionList()
watchSwitchLanguage(fetchPermissionList) // 国际化
</script>

<style lang="scss" scoped></style>
