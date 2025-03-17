<!-- prettier-ignore -->
<template>
  <div class="role-list">
    <el-card>
      <el-table
        :data="allRoles"
        border
        style="width: 100%;"
        v-loading="roleListLoading"
        element-loading-text="Loading...">
        <el-table-column type="index" :label="$t('msg.role.index')" width="120"></el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title"></el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe"></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="200">
          <el-button type="primary" size="small">
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLanguage } from '@/utils/i18n'

// 角色列表
const allRoles = ref([])
const roleListLoading = ref(false)
const fetchRoleList = async () => {
  roleListLoading.value = true
  try {
    const result = await getRoleList()
    allRoles.value = result
  } catch (error) {
  } finally {
    roleListLoading.value = false
  }
}
fetchRoleList()
watchSwitchLanguage(fetchRoleList) // 国际化
</script>

<style lang="scss" scoped></style>
