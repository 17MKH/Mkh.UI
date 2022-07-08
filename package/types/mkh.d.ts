import type { App } from 'vue'
import type { StoreDefinition } from 'pinia'
import type { Router } from 'vue-router'
import type { MkhConfig } from './config'
import { Button, Breadcrumb } from './menu'

/** 模块 */
export interface MkhModule {
  /** 编号 */
  id: number
  /** 唯一编码 */
  code: string
  /** 版本号 */
  version: string
  /** 状态 */
  store: StoreDefinition
  /** 接口对象 */
  api: any
  /** 回调函数 */
  callback(options: { app: App<Element>; config: MkhConfig }): void
}

/** 皮肤 */
export interface MkhSkin {
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
  themes: object
}

/** MKH的全局对象 */
export interface Mkh {
  /** 版本号 */
  readonly version: string
  /** 模块列表 */
  readonly modules: Array<MkhModule>
  /** 皮肤集合 */
  readonly skins: Array<MkhSkin>
  /** 工具栏 */
  readonly toolbars: any
  /** 多语言 */
  readonly locales: Array<string>
  /** 全局组件集合 */
  readonly components: Array<string>
  /** 多语言信息 */
  readonly localeMessages: any
  /** 接口对象 */
  readonly api: any
  /** 路由实例 */
  router: Router
  /** ECharts对象 */
  echarts: any
  /** 图标集合 */
  icons: Array<string>
  /** 系统是否启动 */
  started: boolean
  /** 注册模块 */
  useModule(module: MkhModule): void
  /** 注册皮肤 */
  useSkin(skin: MkhSkin): void
  /** 注册全局组件 */
  useComponent(component: any): void
}

/** 页面 */
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
}
