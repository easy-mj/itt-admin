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
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              v-permission="['distributePermission']"
              @click="handleAssignPermissionClick(row)">
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限弹窗 -->
    <assign-permission-dialog
      v-model="assignPermissionVisible"
      :roleId="selectRoleId"
      @updatePermissionSuccess="fetchRoleList"
    >
    </assign-permission-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLanguage } from '@/utils/i18n'
import AssignPermissionDialog from './components/AssignPermission'

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

// 分配权限弹窗
const assignPermissionVisible = ref(false)
const selectRoleId = ref('')
const handleAssignPermissionClick = (row) => {
  assignPermissionVisible.value = true
  selectRoleId.value = row.id
}

// 关闭弹窗清除选择的roleId
watch(assignPermissionVisible, (val) => {
  if (!val) selectRoleId.value = ''
})
</script>

<style lang="scss" scoped></style>
