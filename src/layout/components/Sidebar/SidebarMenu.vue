<template>
  <el-menu
    :router="true"
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
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
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'

const router = useRouter()
const menuRoutes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})
</script>

<style lang="scss" scoped></style>
