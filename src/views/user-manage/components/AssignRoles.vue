<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="handleClose"
  >
    <el-checkbox-group v-model="userRoles">
      <el-checkbox
        v-for="item in allRoles"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      ></el-checkbox>
    </el-checkbox-group>
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
import { getRoleList } from '@/api/role'
import { getUserRoles, updateRoleByUserId } from '@/api/user-manage'
import { watchSwitchLanguage } from '@/utils/i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const i18n = useI18n()

// 获取所有角色
const allRoles = ref([])
const fetchAllRoles = async () => {
  try {
    const result = await getRoleList()
    allRoles.value = result
  } catch (error) {}
}
fetchAllRoles()
watchSwitchLanguage(fetchAllRoles)

// 获取当前用户角色
const userRoles = ref([])
const fetchUserRoles = async (id) => {
  try {
    const result = await getUserRoles(id)
    userRoles.value = result.role.map((item) => item.id)
  } catch (error) {}
}
watchSwitchLanguage(fetchUserRoles) // 国际化

// 监听userId变化后获取当前用户角色信息
watch(
  () => {
    return props.userId
  },
  (val) => {
    if (val) {
      fetchUserRoles(val)
    }
  }
)

const emits = defineEmits(['update:modelValue', 'updateRoleSuccess'])

// 重置数据
const resetData = () => {
  userRoles.value = []
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
    const roles = userRoles.value.map((id) => {
      return allRoles.value.find((role) => role.id === id)
    })
    await updateRoleByUserId(props.userId, roles)
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    // 发送事件，通知父组件更新数据
    emits('updateRoleSuccess')
    closeDialog()
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
