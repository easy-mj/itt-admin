<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="handleClick"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { watchSwitchLanguage } from '@/utils/i18n'

const i18n = useI18n()

let driver = null
const initDriver = () => {
  // https://github.com/kamranahmedse/driver.js/tree/0.9.7
  driver = new Driver({
    // 突出显示元素背后的背景颜色
    stageBackground: 'rgba(255, 255, 255, 0.2)',
    // 禁止点击蒙版关闭
    allowClose: false,
    // 按钮文本处理，支持国际化
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    doneBtnText: i18n.t('msg.guide.done')
  })
}
onMounted(() => {
  initDriver()
})

watchSwitchLanguage(() => {
  driver.options.closeBtnText = i18n.t('msg.guide.close')
  driver.options.nextBtnText = i18n.t('msg.guide.next')
  driver.options.prevBtnText = i18n.t('msg.guide.prev')
  driver.options.doneBtnText = i18n.t('msg.guide.done')
})

const handleClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped>
/* 自定义高亮样式 */
.custom-highlight {
  border: 2px solid red;
  box-shadow: 0 0 10px red;
}
</style>
