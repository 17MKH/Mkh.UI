import type { Mkh } from '@/types'
import pkg from '../package.json'

/**
 * 全局的mkh对象，该对象只用于保存系统加载过程中
 * 解析出来的一些固定数据，理论上系统启动后，该对象不允许再被更改
 */
const mkh: Mkh = {
  version: pkg.version,
  modules: [],
  skins: [],
  toolbars: {},
  locales: [],
  components: [],
  localeMessages: [],
  icons: [],
}

export default mkh
