import { MoudleDefinition } from './module'
import { SkinDefinition } from './skin'
import { ToolbarDefinition } from './tollbar'

/** MKH的全局对象 */
export interface Mkh {
  /** 版本号 */
  readonly version: string
  /** 模块列表 */
  readonly modules: MoudleDefinition[]
  /** 皮肤集合 */
  readonly skins: SkinDefinition[]
  /** 工具栏 */
  readonly toolbars: {
    [key: string]: ToolbarDefinition
  }
  /** 多语言 */
  readonly locales: { name: string; code: string }[]
  /** 全局组件名称集合 */
  readonly components: string[]
  /** 多语言信息 */
  readonly localeMessages: LocaleMessage[]
  /** 图标集合 */
  icons: string[]
}

declare global {
  interface Window {
    /**
     * 17MKH 全局实例
     */
    mkh: Mkh
  }
}
