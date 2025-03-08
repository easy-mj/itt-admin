<template>
  <el-menu
    :router="true"
    :unique-opened="true"
    :default-active="activeMenu"
    :background-color="cssVar.menuBg"
    :text-color="cssVar.menuText"
    :active-text-color="cssVar.menuActiveText"
  >
    <sidebar-item
      v-for="route in menuRoutes"
      :key="route.path"
      :route="route"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'

// 处理菜单
const router = useRouter()
const menuRoutes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})

// 处理样式
const store = useStore()
const cssVar = computed(() => {
  return store.getters.cssVar
})

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
