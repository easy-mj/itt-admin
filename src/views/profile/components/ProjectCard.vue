<template>
  <div>
    <pan-thumb :image="userInfo.avatar" height="100px" width="100px">
      <div>你好</div>
      {{ userInfo.title }}
    </pan-thumb>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import PanThumb from '@/components/PanThumb'

const store = useStore()
const userInfo = computed(() => store.state.user.userInfo)
</script>

<style lang="scss" scoped></style>
