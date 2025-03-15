<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { ref } from 'vue'
import { getChapter } from '@/api/user'
import { watchSwitchLanguage } from '@/utils/i18n'

// 获取章节数据
const chapterData = ref(null)
const fetchChapter = async () => {
  const res = await getChapter()
  chapterData.value = res
}
fetchChapter()

// 切换语言后重新获取数据
watchSwitchLanguage(() => {
  fetchChapter()
})
</script>

<style lang="scss" scoped></style>
