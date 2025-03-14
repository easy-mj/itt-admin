<template>
  <div class="navbar">
    <!-- 汉堡按钮 -->
    <hamburger class="hamburger-container"></hamburger>
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 主题换肤 -->
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <!-- 国际化 -->
      <lang-select class="right-menu-item hover-effect"></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            :size="30"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/easy-mj/itt-admin">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="handleLogout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect'

// 退出登录
const store = useStore()
const handleLogout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-top: 8px;
    padding-right: 16px;

    :deep(.navbar-container) {
      cursor: pointer;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;
        .el-avatar {
          margin-right: 12px;
          --el-avatar-background-color: none;
        }
      }
    }
  }

  :deep(.right-menu-item) {
    display: inline-block;
    padding: 0 14px 0 0;
    font-size: 20px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
    }
  }
}
</style>
