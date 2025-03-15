<template>
  <el-dialog
    width="30%"
    :title="$t('msg.universal.title')"
    :model-value="modelValue"
    @close="handleCloseClick"
  >
    <div class="content">
      <div class="content-item">
        <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
        <el-color-picker
          v-model="themeColor"
          :predefine="predefineColors"
        ></el-color-picker>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleCloseClick">
        {{ $t('msg.universal.cancel') }}
      </el-button>
      <el-button @click="handleConfirmClick">
        {{ $t('msg.universal.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const store = useStore()

// 主题色值
const themeColor = ref(store.getters.themeColor)
// 预定义色值
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

// 关闭弹窗
const emit = defineEmits(['update:modelValue'])
function closeDialog() {
  emit('update:modelValue', false)
}
const handleCloseClick = () => {
  closeDialog()
}

// 点击确定
const handleConfirmClick = async () => {
  store.commit('theme/setThemeColor', themeColor.value)
  const newStyle = await generateNewStyle(themeColor.value)
  writeNewStyle(newStyle)
  closeDialog()
}
</script>

<style lang="scss" scoped>
.content-item {
  text-align: center;
  .title {
    margin-bottom: 6px;
  }
}
</style>
