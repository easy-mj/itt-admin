<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>
      <!-- 标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown :title="title" :detail="detail" @onSuccess="handleSucess" />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor :title="title" :detail="detail" @onSuccess="handleSucess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/api/article'
import Editor from './components/Editor'
import Markdown from './components/Markdown'

const title = ref('')
const activeName = ref('markdown')

// 成功回调
const handleSucess = () => {
  title.value = ''
  detail.value = {}
}

// 编辑处理
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const fetchArticleDetail = async () => {
  detail.value = await getArticleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}
if (articleId) {
  fetchArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
