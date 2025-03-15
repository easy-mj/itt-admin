import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'

export function generateTitle(title) {
  return i18n.global.t(`msg.route.${title}`)
}

/**
 * 监听语言变化，同时执行 cb 回调
 */
export function watchSwitchLanguage(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
