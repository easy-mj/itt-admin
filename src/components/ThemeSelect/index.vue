<template>
  <!-- 透传 Attributes: https://cn.vuejs.org/guide/components/attrs -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <!-- 弹出层 -->
    <div></div>
  </el-dropdown>
</template>

<script setup>
const handleSetTheme = (command) => {
  if (command === 'color') {
    // 切换主题颜色
    console.log('切换主题颜色')
  }
}
</script>

<style lang="scss" scoped></style>
