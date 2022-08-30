import pkg from '../package.json'

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

/**
 * 全局的mkh对象，该对象只用于保存系统加载过程中
 * 解析出来的一些固定数据，理论上系统启动后，该对象不允许再被更改
 */
const mkh: Mkh = {
  version: pkg.version,
  modules: [],
  components: [],
  icons: [],
}

export default mkh
