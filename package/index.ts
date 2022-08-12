import type { AppService, BootstrapOptions, ModuleDefinition, SkinDefinition } from '@/types'
import mkh from './mkh'
import { createApp } from 'vue'
import Locales from './locales'
import Layout from './layout.vue'
import useRouter, { router } from './router'
import useStore, { useTokenStore, useConfigStore } from './store'
import _ from 'lodash'
/** 导入ElementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/app.scss'
import Components from './components'
import Directives from './directives'
import useSkins from './skins'
import { defaultConfig } from './defaults'
import VCharts from 'vue-echarts'
import { defaultBootstrapOptions } from './defaults'

/**
 * 模块列表
 */
const modules: ModuleDefinition[] = []
/**
 * 应用服务集合
 */
const services: AppService[] = []

/**
 * 皮肤集合
 */
const skins: SkinDefinition[] = []

/**
 * 注册模块
 * @param module 模块
 */
export const useModule = (module: ModuleDefinition) => {
  if (modules.findIndex((m) => m.code === module.code) === -1) {
    modules.push(module)
  }
}

/**
 * 注册应用服务
 * @param service 应用服务
 *
 * @remarks
 *
 * 应用服务会在Vue根实例挂载前调用，您可以在该服务内添加自定义的功能，如注册第三方组件，也可以更改系统默认属性和行为，如自定义登录方法
 */
export const useAppService = (service: AppService) => {
  services.push(service)
}

/**
 * 注册皮肤
 * @param skin 皮肤定义
 */
export const useSkin = (skin: SkinDefinition) => {
  if (skins.findIndex((m) => m.code === skin.code) === -1) {
    skins.push(skin)
  }
}

/**
 * 启动应用
 * @param options 配置项
 */
export const bootstrap = (options_: BootstrapOptions) => {
  const config = _.merge({}, defaultConfig)
  const bootstrapOptions = _.merge({}, defaultBootstrapOptions, options_)

  const app = createApp(Layout)

  //将mkh实例挂载到vue实例
  app.config.globalProperties.$mkh = mkh

  //模块按照id排序
  modules.sort((a, b) => a.id - b.id)

  //注册国际化
  app.use(Locales, bootstrapOptions, modules)

  //注册状态
  app.use(useStore)

  //注册路由
  app.use(useRouter)

  //注册ElementPlus
  app.use(ElementPlus)

  //注册全局组件
  app.use(Components, modules)

  /* 注册vue-echarts组件 */
  /* 说明文档 https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md */
  app.component('VChart', VCharts)

  //注册指令
  app.use(Directives)

  //注册皮肤
  app.use(useSkins, skins)

  //执行模块的回调函数
  services.forEach((c) => {
    c({ app, config, options: bootstrapOptions })
  })

  //从本地存储中加载令牌
  const tokenStore = useTokenStore()
  tokenStore.load()

  //初始化配置
  const configStore = useConfigStore()
  configStore.$state = config

  //等待路由注册完成后再挂载
  router.isReady().then(() => {
    //提前解析图标并保存到mkh中
    const icons: string[] = []
    document.querySelectorAll('body>svg>symbol').forEach((m) => icons.push(m.id.replace('m-', '')))
    mkh.icons = icons

    app.mount('#app')
  })
}

export * from './composables'
export * from './utils'
export * from './store'
export { mkh }
