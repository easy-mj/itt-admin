<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.language.languageChange')" :effect="effect">
        <svg-icon icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-menu">
        <el-dropdown-item :disabled="isZh" command="zh">
          {{ $t('msg.language.chinese') }}
        </el-dropdown-item>
        <el-dropdown-item :disabled="isEn" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineProps({
  // 主题
  effect: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val)
  }
})

const store = useStore()
const language = computed(() => store.getters.language)
const isZh = computed(() => language.value === 'zh')
const isEn = computed(() => language.value === 'en')

// 切换语言
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改 vuex 保存的 language
  store.commit('app/setLanguage', lang)
  // 提示信息
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped></style>
