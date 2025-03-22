<template>
  <div class="editor-container">
    <!-- 渲染区域 -->
    <div id="editor"></div>
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
import WangEditor from 'wangeditor'
import i18next from 'i18next'
import { watchSwitchLanguage } from '@/utils/i18n'
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
// 初始化 Editor 实例
const initEditor = () => {
  editor = new WangEditor(el)
  editor.config.zIndex = 1
  editor.config.showMenuTooltips = true // 菜单栏提示
  editor.config.menuTooltipPosition = 'down' // 菜单栏提示位置

  // 国际化处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next

  editor.create()
}

onMounted(() => {
  el = document.querySelector('#editor')
  initEditor()
})

// 切换语言
watchSwitchLanguage(() => {
  if (!el) return
  // 切换语言后要保留编辑框中的内容信息
  const htmlStr = editor.txt.html()
  editor.destroy()
  initEditor()
  editor.txt.html(htmlStr)
})

// 数据回填
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor && editor.txt.html(val.content)
    } else {
      editor && editor.txt.html('')
    }
  },
  {
    immediate: true
  }
)

// 点击提交
const handleSubmitClick = async () => {
  try {
    if (props.detail && props.detail._id) {
      await editArticle({
        id: props.detail._id,
        title: props.title,
        content: editor.txt.html()
      })
    } else {
      await commitArticle({
        title: props.title,
        content: editor.txt.html()
      })
    }
    editor.txt.html('')
    emits('onSuccess')
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
.editor-container {
  .btn-bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
