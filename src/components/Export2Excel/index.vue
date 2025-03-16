<template>
  <el-dialog
    width="30%"
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @closed="handleClose"
  >
    <el-input :placeholder="$t('msg.excel.placeholder')"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="handleConfirm">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 处理关闭弹窗
const closeDialog = () => {
  emits('update:modelValue', false)
}
const handleClose = () => {
  closeDialog()
}
const handleConfirm = () => {
  closeDialog()
}
</script>

<style lang="scss" scoped></style>
