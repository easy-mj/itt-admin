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
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="showSetThemeDialog"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from '@/components/SelectColor'

// 弹出层
const showSetThemeDialog = ref(false)
const handleSetTheme = (command) => {
  if (command === 'color') {
    // 切换主题颜色
    console.log('切换主题颜色')
    showSetThemeDialog.value = true
  }
}
</script>

<style lang="scss" scoped></style>
