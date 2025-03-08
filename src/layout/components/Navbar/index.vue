<template>
  <div class="navbar">
    <!-- 汉堡按钮 -->
    <hamburger class="hamburger-container"></hamburger>
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/easy-mj/itt-admin">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="handleLogout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger'

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
  box-shadow: 0 1px 4px rgab(0, 21, 41, 0.08);
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

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
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
}
</style>
