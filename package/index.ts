import type { Bootstrap, BootstrapOptions, IMoudle, ModuleCallback } from './types/main'
import mkh from './mkh'
import { createApp } from 'vue'
import Locales from './locales'
import Layout from './layout.vue'
import MkhRouter, { router } from './router'
import MkhStore, { useTokenStore, useConfigStore } from './store'
import _ from 'lodash'
/** 导入ElementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/app.scss'
import Components from './components'
import Directives from './directives'
import createHttp from './utils/http'
import Skins from './skins'
import config from './config'

import VCharts from 'vue-echarts'
import * as echarts from 'echarts'

/** 默认启动配置 */
const defaultOptions: BootstrapOptions = {
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
}

/** 模块列表 */
const modules: IMoudle[] = []
/** 模块中的回调函数列表 */
const moduleCallbacks: ModuleCallback[] = []

/**
 * 注册模块
 * @param module 模块
 */
export const useModule = (module: IMoudle) => {
  if (modules.findIndex((m) => m.code === module.code) === -1) {
    modules.push(module)
  }
}

/**
 * 注册模块回调函数
 * @param callback 模块回调函数
 */
export const useModuleCallback = (callback: ModuleCallback) => {
  moduleCallbacks.push(callback)
}

/**
 * 启动应用
 * @param options 启动配置项
 */
export const bootstrap: Bootstrap = (options: BootstrapOptions) => {
  const options_ = _.merge({}, defaultOptions, options)

  const app = createApp(Layout)

  //将mkh实例挂载到vue实例
  app.config.globalProperties.$mkh = mkh

  //模块按照id排序
  mkh.modules.sort((a, b) => a.id - b.id)

  //注册国际化
  app.use(Locales, options_.locale)

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
  mkh.echarts = echarts

  //注册指令
  app.use(Directives)

  //注册皮肤
  app.use(Skins)

  //执行模块的回调函数
  moduleCallbacks.forEach((c) => {
    c({ app, config, mkh, options: options_ })
  })

  //从本地存储中加载令牌
  const tokenStore = useTokenStore()
  tokenStore.load()

  //执行挂载前的钩子函数
  if (options_.beforeMount) {
    options_.beforeMount({ app, config })
  }

  //初始化配置
  const configStore = useConfigStore()
  configStore.$state = config

  //等待路由注册完成后再挂载
  router.isReady().then(() => {
    //提前解析图标并保存到mkh中
    const icons = []
    document.querySelectorAll('body>svg>symbol').forEach((m) => icons.push(m.id.replace('m-', '')))
    mkh.icons = icons

    app.mount('#app')
  })
}

export { mkh, createHttp }
export * from './composables'
export * from './utils'
export * from './store'
