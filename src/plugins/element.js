import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/store'

export default (app) => {
  // 根据当前语言选择使用哪种语言包
  app.use(ElementPlus, { locale: store.getters.language === 'zh' ? zhCn : en })

  // 注册 Element 所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
