<template>
  <div class="sidebar-index">
    <div class="logo-container">
      <el-avatar
        size="44"
        shape="square"
        src="https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png"
      ></el-avatar>
      <h3 class="logo-title" v-if="sidebarOpened">ITT 后台系统</h3>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SidebarMenu from './SidebarMenu.vue'

const store = useStore()
const sidebarOpened = computed(() => {
  return store.getters.sidebarOpened
})
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  padding: 10px 0 22px 0;

  .logo-title {
    margin-left: 10px;
    line-height: 50px;
    color: #fff;
    font-size: 16px;
    white-space: nowrap; /* 文字不允许换行 */
    font-weight: bold;
  }
}
</style>
