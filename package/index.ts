import type { AppService, BootstrapOptions, Config, ModuleDefinition, SkinDefinition } from '@/types'
import mkh from './mkh'
import { createApp } from 'vue'
import { usei18n } from './locales'
import Layout from './layout.vue'
import useRouter, { router } from './router'
import useStore, { useTokenStore } from './store'
import _ from 'lodash'
/** 导入ElementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/app.scss'
import Components from './components'
import Directives from './directives'
import Skins from './skins'
import { defaultConfig } from './defaults'
import * as echarts from 'echarts'
import VCharts from 'vue-echarts'
import { defaultBootstrapOptions } from './defaults'

/**
 * 模块列表
 */
const modules: ModuleDefinition[] = []

/**
 * 应用创建后服务集合
 */
const createdServices: AppService[] = []

/**
 * 应用挂在去服务集合
 */
const mountServices: AppService[] = []

/**
 * 皮肤集合
 */
const skins: SkinDefinition[] = []

/**
 * 注册模块
 * @param module - 模块
 */
export const useModule = (module: ModuleDefinition) => {
  if (modules.findIndex((m) => m.code === module.code) === -1) {
    modules.push(module)

    mkh.modules.push({
      id: module.id,
      code: module.code,
      label: module.label || '',
      version: module.version,
      description: module.description,
    })
  }
}

/**
 * 注册应用创建后服务
 * @param service - 应用服务
 *
 * @remarks
 *
 * 应用服务会在Vue实例创建后调用，您可以在该服务内添加自定义的功能，如更改系统默认属性和行为，如自定义登录方法
 */
export const useAppCreatedService = (service: AppService) => {
  createdServices.push(service)
}

/**
 * 注册应用挂载前服务
 * @param service - 应用服务
 *
 * @remarks
 *
 * 应用服务会在Vue实例创建后调用，您可以在该服务内添加自定义的功能，如注册第三方组件
 */
export const useAppMountService = (service: AppService) => {
  mountServices.push(service)
}

/**
 * 注册皮肤
 * @param skin - 皮肤定义
 */
export const useSkin = (skin: SkinDefinition) => {
  if (skins.findIndex((m) => m.code === skin.code) === -1) {
    skins.push(skin)
  }
}

/**
 * 启动应用
 * @param options - 配置项
 */
export const bootstrap = (options_: BootstrapOptions) => {
  const config = _.merge({}, defaultConfig) as Config
  const bootstrapOptions = _.merge({}, defaultBootstrapOptions, options_)

  const app = createApp(Layout)

  //执行应用创建后的服务
  createdServices.forEach((c) => {
    c({ app, config, options: bootstrapOptions })
  })

  //注册状态
  app.use(useStore, config)

  //模块按照id排序
  modules.sort((a, b) => a.id - b.id)

  //注册国际化
  app.use(usei18n, bootstrapOptions)

  //注册路由
  app.use(useRouter, modules)

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
  app.use(Skins, skins)

  //从本地存储中加载令牌
  const tokenStore = useTokenStore()
  tokenStore.load()

  //执行应用挂载前服务
  mountServices.forEach((c) => {
    c({ app, config, options: bootstrapOptions })
  })

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
export { mkh, echarts }

/** 类型导出 */
export * from './types/index'
export * from './locales/lang/zh-cn'
