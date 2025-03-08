<template>
  <!-- icon -->
  <svg-icon :icon="icon"></svg-icon>
  <!-- 文本 -->
  <span>{{ title }}</span>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
