import { Mkh, MkhModule } from '@/types/mkh'
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
  router: null,
  store: null,
  localeMessages: [],
  api: [],
  useModule: function (module: MkhModule) {
    if (this.modules.findIndex((m) => m.code === module.code) === -1) {
      this.modules.push(module)
    }
  },
  useSkin: function (skin) {
    if (this.skins.findIndex((m) => m.code === skin.code) === -1) {
      this.skins.push(skin)
    }
  },
  useComponent: function (component) {
    this.components_.push(component)
  },
  echarts: undefined,
  icons: [],
  started: false,
}

export default mkh
