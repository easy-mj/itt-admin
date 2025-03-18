<template>
  <el-dialog
    :title="$t('msg.role.assignPermissions')"
    :model-value="modelValue"
    @close="handleClose"
  >
    <el-tree
      ref="treeRef"
      :data="allPermissions"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    ></el-tree>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getPermissionList } from '@/api/permission'
import { getRolePermissions, distributePermission } from '@/api/role'
import { watchSwitchLanguage } from '@/utils/i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'updatePermissionSuccess'])
const i18n = useI18n()

// 树形控件ref
const treeRef = ref(null)
// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 获取所有权限数据
const allPermissions = ref([])
const fetchPermissions = async () => {
  try {
    const result = await getPermissionList()
    allPermissions.value = result
  } catch (error) {}
}
fetchPermissions()
watchSwitchLanguage(fetchPermissions)

// 获取当前角色的权限数据
const fetchRolePermissions = async (roleId) => {
  try {
    const result = await getRolePermissions(roleId)
    // 回填树形控件数据，设置选中项
    treeRef.value.setCheckedKeys(result)
  } catch (error) {}
}
watch(
  () => props.roleId,
  (val) => {
    if (val) fetchRolePermissions(val)
  }
)

// 重置数据
const resetData = () => {
  treeRef.value.setCheckedKeys([])
}

const closeDialog = () => {
  resetData()
  emits('update:modelValue', false)
}

const handleClose = () => {
  closeDialog()
}

// 点击确定
const handleConfirm = async () => {
  try {
    await distributePermission({
      roleId: props.roleId,
      permissions: treeRef.value.getCheckedKeys()
    })
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    // 更新成功后，通知父组件
    emits('updatePermissionSuccess')
  } catch (error) {
  } finally {
    closeDialog()
  }
}
</script>

<style lang="scss" scoped></style>
