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
const handleConfirm = async () => {
  exportLoading.value = true
  try {
    const allUsers = await getUserManageAllList()
    console.log(allUsers)
    closeDialog()
  } catch (error) {
  } finally {
    exportLoading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
