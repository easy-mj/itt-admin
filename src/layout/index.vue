<template>
  <div
    class="app-wrapper"
    :class="sidebarOpened ? 'openSidebar' : 'hideSidebar'"
  >
    <!-- 左侧 Menu -->
    <side-bar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></side-bar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 Navbar -->
        <navbar></navbar>
      </div>
      <!-- 主内容区 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import variables from '@/style/variables.module.scss'
import Navbar from './components/Navbar'
import SideBar from './components/Sidebar'
import AppMain from './components/AppMain'

// 处理菜单折叠
const store = useStore()
const sidebarOpened = computed(() => {
  return store.getters.sidebarOpened
})
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
@import '~@/style/variables.module.scss';

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  @include clearfix;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .fixed-header {
    width: calc(100% - #{$hiddenSidebarWidth});
  }
}
</style>
