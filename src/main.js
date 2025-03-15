import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 注册i18n
import i18n from '@/i18n'

// 初始化样式表
import '@/style/index.scss'
// 导入 SvgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import '@/permission'
// 导入全局属性
import installFilter from '@/filter'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
app.use(store).use(router).use(i18n).mount('#app')
