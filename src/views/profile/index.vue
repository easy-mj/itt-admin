<template>
  <div class="profile">个人中心{{ $t('message.hello') }}</div>
  <el-pagination
    v-model:current-page="currentPage"
    :page-size="100"
    :size="size"
    :disabled="disabled"
    :background="background"
    layout="total, prev, pager, next"
    :total="1000"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
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
