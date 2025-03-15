<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

// 根据当前主题色写入新 style 样式
const store = useStore()
generateNewStyle(store.getters.themeColor).then((newStyle) => {
  writeNewStyle(newStyle)
})
</script>

<style></style>
