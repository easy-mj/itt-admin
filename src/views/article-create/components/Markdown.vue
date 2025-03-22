<template>
  <div class="markdown-container">
    <!-- 渲染区域 -->
    <div id="markdown-editor"></div>
    <!-- 提交按钮 -->
    <div class="btn-bottom">
      <el-button
        type="primary"
        :disabled="isTitleEmpty"
        @click="handleSubmitClick()"
      >
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { watchSwitchLanguage } from '@/utils/i18n'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])

const store = useStore()

// 标题是否为空
const isTitleEmpty = computed(() => {
  return props.title.length === 0
})

let editor
let el
// 初始化渲染
const initEditor = () => {
  editor = new Editor({
    el,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  editor.getMarkdown()
}

onMounted(() => {
  el = document.querySelector('#markdown-editor')
  initEditor()
})

// 数据回填
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor && editor.setHTML(val.content)
    } else {
      editor && editor.setHTML('')
    }
  },
  {
    immediate: true
  }
)

// 切换语言
watchSwitchLanguage(() => {
  if (!el) return
  // 切换语言后要保留编辑框中的内容信息
  const htmlStr = editor.getHTML()
  editor.destroy()
  initEditor()
  editor.setHTML(htmlStr)
})

// 点击提交
const handleSubmitClick = async () => {
  try {
    if (props.detail && props.detail._id) {
      await editArticle({
        id: props.detail._id,
        title: props.title,
        content: editor.getHTML()
      })
    } else {
      await commitArticle({
        title: props.title,
        content: editor.getHTML()
      })
    }
    editor.reset()
    emits('onSuccess')
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .btn-bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
