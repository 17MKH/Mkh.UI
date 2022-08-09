import type { App, Component } from 'vue'
import type { StoreDefinition } from 'pinia'
import type { Router } from 'vue-router'
import type { Config } from './config'
import type { Button, Breadcrumb } from './menu'
import type { Api } from './api'

/** 语言选项 */
declare type locale = 'zh-cn' | 'en'

/** 页面定义 */
export interface Page {
  /** 图标 */
  icon: string
  /** 名称(路由名称) */
  name: string
  /** 路径(路由地址) */
  path: string
  /** 组件 */
  component: any
  /** 是否在框架内显示 */
  inFrame?: boolean
  /** 是否隐藏菜单 */
  hideMenu?: boolean
  /** 是否进行权限校验 */
  permissionVerify?: boolean
  /** 绑定权限列表 */
  permissions?: Array<string>
  /** 按钮列表 */
  buttons?: Array<Button>
  /** 自定义面包屑 */
  breadcrumbs?: Array<Breadcrumb>
  /** 是否缓存 */
  cache?: boolean
  /** 路由启用props特性 */
  props?: boolean
  /**
   *
   */
  parent?: string
}

/** 模块定义 */
export interface IMoudle {
  /** 编号 */
  id: number
  /** 唯一编码 */
  code: string
  /** 版本号 */
  version: string
  /** 页面 */
  pages: Page[]
  /** 全局组件列表 */
  components: { name: string; component: Component }[]
}

/** 模块定义 */
export interface Module<Store, Api> extends IMoudle {
  /** 状态 */
  store: Store
  /** 接口对象 */
  api: Api
}

/** 皮肤定义 */
export interface Skin {
  /** 名称 */
  name: string
  /** 唯一编码 */
  code: string
  /** 预览图路径 */
  preview: string
  /** 状态 */
  store: any
  /** 组件 */
  component: any
  /** 主题 */
  themes: {
    /** 主题名称 */
    name: string
    /** 色值 */
    color: string
  }[]
}

export interface LocaleMessage {
  el: {}
  ui: {}
  mod: {
    [route: string]: string | {}
    routes: {}
  }
  skiny: {}
}

/** 顶部工具栏 */
export interface Toolbar {
  /** 唯一编码 */
  code: string
  /** 说明，多语言Key */
  label: string
  /** 是否显示 */
  show: boolean
  /** 排序 */
  sort: number
}

interface Toolbars {
  [key: string]: Toolbar
}

/** MKH的全局对象 */
export interface Mkh {
  /** 版本号 */
  readonly version: string
  /** 模块列表 */
  readonly modules: Array<Module>
  /** 皮肤集合 */
  readonly skins: Array<Skin>
  /** 工具栏 */
  readonly toolbars: Toolbars
  /** 多语言 */
  readonly locales: Array<{ name: string; code: string }>
  /** 全局组件集合 */
  readonly components: Array<string>
  /** 多语言信息 */
  readonly localeMessages: Array<LocaleMessage>
  /** 接口对象 */
  readonly api: Api
  /** ECharts对象 */
  echarts: any
  /** 图标集合 */
  icons: Array<string>
  /** 系统是否启动 */
  started: boolean
  /** 注册模块 */
  useModule(module: Module): void
  /** 注册皮肤 */
  useSkin(skin: Skin): void
}

interface HttpOptions {
  baseURL?: string
}

/**
 * 启动配置项
 */
export interface BootstrapOptions {
  /** 多语言配置 */
  locale?: {
    /** 默认语言，默认中文 */
    default?: locale
    /** 备用语言 */
    fallback?: locale
  }
  /** 接口配置 */
  http?: {
    /** 全局接口地址 */
    global?: HttpOptions
    /** 模块配置，会覆盖全局配置 */
    modules?: {
      [key: string]: HttpOptions
    }
  }
  /** 挂载前的钩子函数 */
  beforeMount?(options: { app: App<Element>; config: Config }): void
}

/**
 * 启动应用
 */
export interface Bootstrap {
  (options: BootstrapOptions): void
}

/**
 * 模块回调函数，该函数在vue根实例挂载前调用，您可以在该函数内注册第三方组件或全局组件
 */
export interface ModuleCallback {
  (options: { app: App<Element>; config: Config; mkh: Mkh; options: BootstrapOptions }): void
}

/**
 * 应用启动器配置
 */
export interface BootstrapOptions {
  /** 多语言配置 */
  locale?: {
    /** 默认语言，默认中文 */
    default?: locale
    /** 备用语言 */
    fallback?: locale
  }
  /** 接口配置 */
  http?: {
    /** 全局接口地址 */
    global?: {
      baseURL?: string
    }
    /** 模块配置，会覆盖全局配置 */
    modules?: {}
  }
  /** 挂载前的钩子函数 */
  beforeMount?(options: { app: App<Element>; config: Config }): void
}
