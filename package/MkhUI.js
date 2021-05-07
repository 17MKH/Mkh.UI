import pkg from '../package.json'

/**
 * 定义全局的MkhUI对象，该对象只用于保存系统加载过程中
 * 解析出来的一些固定数据，理论上系统启动后，该对象不会再被更改
 */
window.MkhUI = {
  /** 版本号 */
  version: pkg.version,
  /** 模块列表 */
  modules: [],
  /** 皮肤列表 */
  skins: [],
  /** 语言集 */
  locales: [],
  /**配置信息 */
  config: {
    /**站点信息 */
    site: {
      /**系统Logo */
      logo: '',
      /**系统标题 */
      title: '',
      /**默认页，路由名称 */
      defaultPage: '',
    },
    /**组件配置 */
    component: {
      /**加载动画 */
      loading: {
        background: 'rgba(255, 255, 255, 0.6)',
        spinner: 'el-icon-loading',
      },
      /**登录组件，默认是mu-login-m */
      login: 'm',
    },
    /**系统操作，供系统内部使用，用户需要通过替换默认操作方法来实现自定义功能 */
    actions: {
      /**登录方法(异步) */
      login: null,
      /**获取验证码方法 */
      getVerifyCode: null,
      /**获取账户信息(异步) */
      getAccountInfo: null,
    },
  },
  /** 注册模块 */
  useModule: function (module) {
    this.modules.push(module)
  },
  /** 注册皮肤 */
  useSkin: function (skin) {
    this.skins.push(skin)
  },
}
