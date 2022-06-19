import './mkh'
import { createApp } from 'vue'
import Locales from './locales'
import Layout from './layout.vue'
import MkhRouter from './router'
import MkhStore from './store'
import _ from 'lodash'
/** 导入ElementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Components from './components'
import Directives from './directives'
import Http from './utils/http'
import './styles/app.scss'
import Skins from './skins'
import config from './config'

import VCharts from 'vue-echarts'
import * as echarts from 'echarts'

/** 最终的配置项信息 */
let finalOptions = {
  /** 多语言配置 */
  locale: {
    /** 默认语言 */
    default: 'zh-cn',
    /** 备用语言 */
    fallback: 'zh-cn',
  },
  /** 接口配置 */
  http: {
    /** 全局接口地址 */
    global: {
      baseURL: '',
    },
    /** 模块配置，会覆盖全局配置 */
    modules: {},
  },
  /** 挂载前的钩子函数 */
  beforeMount: null,
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
  app.use(Locales, finalOptions.locale)

  //注册状态
  app.use(MkhStore)

  //注册路由
  app.use(MkhRouter)

  //注册ElementPlus
  app.use(ElementPlus)

  //注册全局组件
  app.use(Components)

  /* 注册vue-echarts组件 */
  /* 说明文档 https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md */
  app.component('VChart', VCharts)

  //绑定到全局变量
  app.config.globalProperties.$echarts = echarts
  mkh.$echarts = echarts

  //注册指令
  app.use(Directives)

  //注册皮肤
  app.use(Skins)

  //注册Http服务
  app.use(Http, finalOptions.http)

  //执行模块的回调函数
  mkh.modules.forEach(m => {
    //执行回调函数
    if (m.callback) {
      m.callback({ app, config })
    }
  })

  //从本地存储中加载令牌
  await mkh.store.dispatch('app/token/login')

  //执行挂载前的钩子函数
  if (finalOptions.beforeMount && typeof finalOptions.beforeMount === 'function') {
    finalOptions.beforeMount({ app, config })
  }

  //初始化配置
  await mkh.store.commit('app/config/init', config)

  //等待路由注册完成后再挂载
  mkh.router.isReady().then(() => {
    //提前解析图标并保存到mkh中
    const icons = []
    document.querySelectorAll('body>svg>symbol').forEach(m => icons.push(m.id.replace('m-', '')))
    mkh.icons = icons

    app.mount('#app')
  })
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
