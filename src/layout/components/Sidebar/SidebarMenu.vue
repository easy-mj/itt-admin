<template>
  <el-menu
    :router="true"
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 个人中心 -->
    <el-menu-item index="/profile">
      <template #title>
        <svg-icon icon="user"></svg-icon>
        <span>个人中心</span>
      </template>
    </el-menu-item>
    <!-- 用户 -->
    <el-sub-menu index="/user">
      <template #title>
        <svg-icon icon="personnel"></svg-icon>
        <span>用户</span>
      </template>
      <el-menu-item index="/user/manage">
        <template #title>
          <svg-icon icon="personnel-manage"></svg-icon>
          <span>员工管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/user/role">
        <template #title>
          <svg-icon icon="role"></svg-icon>
          <span>角色列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/user/permission">
        <template #title>
          <svg-icon icon="permission"></svg-icon>
          <span>权限列表</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- 文章 -->
    <el-sub-menu index="/article">
      <template #title>
        <svg-icon icon="article"></svg-icon>
        <span>文章</span>
      </template>
      <el-menu-item index="/article/ranking">
        <template #title>
          <svg-icon icon="article-ranking"></svg-icon>
          <span>文章排名</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/article/create">
        <template #title>
          <svg-icon icon="article-create"></svg-icon>
          <span>创建文章</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup></script>

<style lang="scss" scoped></style>
