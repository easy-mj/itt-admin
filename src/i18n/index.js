import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  zh: {
    message: {
      hello: '你好，世界'
    }
  }
}

const locale = 'en'

const i18n = createI18n({
  // 使用 Composition API 时，需要使用 legacy: false
  legacy: false,
  // 全局使用 t('message.hello') 时，需要设置 globalInjection: true
  globalInjection: true,
  // 全局使用 $t('message.hello') 时，需要设置 fallbackLocale
  fallbackLocale: 'en',
  locale,
  messages
})

export default i18n
