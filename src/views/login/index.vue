<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item>
        <span class="svg-container">
          <el-icon><avatar /></el-icon>
        </span>
        <el-input placeholder="username" name="username" type="text"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item>
        <span class="svg-container">
          <el-icon><avatar /></el-icon>
        </span>
        <el-input placeholder="password" name="password" type="text"></el-input>
        <span class="show-password">
          <el-icon><avatar /></el-icon>
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button type="primary" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.login-btn {
  width: 100%;
  margin-bottom: 30px;
}
</style>
