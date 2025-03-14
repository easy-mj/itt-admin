import { createI18n } from 'vue-i18n'
import store from '@/store'
import zhLocale from './lang/zh'
import enLocale from './lang/en'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

// 获取当前 language
function getLanguage() {
  return store && store.getters.language
}

const i18n = createI18n({
  // 使用 Composition API 时，需要使用 legacy: false
  legacy: false,
  // 全局使用 t('message.hello') 时，需要设置 globalInjection: true
  globalInjection: true,
  // 全局使用 $t('message.hello') 时，需要设置 fallbackLocale
  fallbackLocale: 'en',
  locale: getLanguage(),
  messages
})

export default i18n
