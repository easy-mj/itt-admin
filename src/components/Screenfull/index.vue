<template>
  <div @click="handleToggleClick">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 触发事件
const handleToggleClick = () => {
  screenfull.toggle()
  isFullscreen.value = !isFullscreen.value
}

// 监听 screenfull 的变化，on：绑定监听，off：取消监听
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
