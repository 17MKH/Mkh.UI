import pkg from '../package.json'

/**
 * 定义全局的mkh对象，该对象只用于保存系统加载过程中
 * 解析出来的一些固定数据，理论上系统启动后，该对象不会再被更改
 */
if (!window.mkh)
  window.mkh = {
    /** 版本号 */
    version: pkg.version,
    /** 模块列表 */
    modules: [],
    /** 皮肤列表 */
    skins: [],
    /** 工具栏按钮列表 */
    toolbars: {},
    /** 语言集 */
    locales: [],
    /** 全局组件列表 */
    components: [],
    /** 路由实例 */
    router: null,
    /** 状态实例 */
    store: null,
    /** 国际化信息 */
    localeMessages: [],
    /** 注册模块 */
    useModule: function (module) {
      if (this.modules.findIndex(m => m.code === module.code) === -1) {
        this.modules.push(module)
      }
    },
    /** 注册皮肤 */
    useSkin: function (skin) {
      if (this.skins.findIndex(m => m.code === skin.code) === -1) {
        this.skins.push(skin)
      }
    },
    /** 注册全局组件 */
    useComponent: function (component) {
      if (!this.components_) this.components_ = []
      this.components_.push(component)
    },
  }
