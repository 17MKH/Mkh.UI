import { ModuleDefinition } from './module'
import { SkinDefinition } from './skin'
import { ToolbarDefinition } from './tollbar'

/** MKH的全局对象 */
export interface Mkh {
  /** 版本号 */
  readonly version: string
  /** 模块列表 */
  readonly modules: Array<{ id: number; code: string; label: string; version: string; description: string }>
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
