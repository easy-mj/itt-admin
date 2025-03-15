<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLanguage } from '@/utils/i18n'

// 根据当前主题色写入新 style 样式
const store = useStore()
generateNewStyle(store.getters.themeColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

// 切换语言时重新获取用户信息
watchSwitchLanguage(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
