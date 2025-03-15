<template>
  <div class="profile">个人中心</div>
  <el-pagination
    v-model:current-page="currentPage"
    :page-size="100"
    :disabled="disabled"
    :background="background"
    layout="total, prev, pager, next"
    :total="1000"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const currentPage = ref(5)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="scss" scoped></style>
