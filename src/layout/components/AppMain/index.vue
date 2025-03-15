<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  // 浏览器可视区域高度100vh
  height: calc(100vh - 50px);
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
