import { ModuleDefinition } from './module'

/** MKH的全局对象 */
export interface Mkh {
  /** 版本号 */
  readonly version: string
  /** 模块列表 */
  readonly modules: ModuleDefinition[]
  /** 全局组件名称集合 */
  readonly components: string[]
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
