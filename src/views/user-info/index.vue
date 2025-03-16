<template>
  <div class="user-info">用户信息</div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserDetail } from '@/api/user-manage'
import { watchSwitchLanguage } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 获取详情数据
const detailData = ref([])
const fetchUserDetail = async () => {
  detailData.value = await getUserDetail(props.id)
}
fetchUserDetail()
// 切换语言
watchSwitchLanguage(() => {
  fetchUserDetail()
})
</script>

<style lang="scss" scoped></style>
