import './MkhUI'
import { createApp } from 'vue'
import Locale, { i18n } from './utils/locale'
import Layout from './layout.vue'
import MkhRouter, { router } from './router'
import MkhStore, { store } from './store'
import _ from 'lodash'
/** 导入ElementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import Components from './components'
import Directives from './directives'
import Http from './utils/http'
import './styles/app.scss'
import Skins from './skins'

/** 最终的配置信息 */
let finalOptions = {
  /** 多语言配置 */
  locale: {
    /** 默认语言 */
    default: 'zh-cn',
    /** 备用语言 */
    fallback: 'zh-cn',
    /** 语言集 */
    messages: [],
  },
}

/**
 * @description 初始化配置
 */
const configure = options => {
  finalOptions = _.merge({}, finalOptions, options)
}

/**
 * @description 启动
 */
const start = async () => {
  const app = createApp(Layout)

  //将mkh实例挂载到vue实例
  app.config.globalProperties.$mkh = mkh

  //模块按照id排序
  mkh.modules = mkh.modules.sort((a, b) => a.id - b.id)

  //注册国际化
  app.use(Locale, finalOptions.locale)

  //注册路由
  app.use(MkhRouter)

  //注册状态
  app.use(MkhStore)

  //注册ElementPlus
  app.use(ElementPlus, { i18n: i18n.global.t })

  //注册全局组件
  app.use(Components)

  //注册指令
  app.use(Directives)

  //注册皮肤
  app.use(Skins)

  //注册Http服务
  app.use(Http)

  //执行模块的回调函数
  mkh.modules.forEach(m => {
    //执行回调函数
    if (m.callback) {
      m.callback({ app, router, store })
    }
  })

  //从本地存储中加载令牌
  await store.dispatch('app/token/login')

  app.mount('#app')
}

/** 页面加载完成后启动系统 */
if (!mkh.started) {
  mkh.started = true
  window.onload = () => {
    //加个延迟，防止预加载页面一闪而过
    setTimeout(() => {
      start()
    }, 1000)
  }
}

export { configure }
export * from './composables'
export * from './utils'
