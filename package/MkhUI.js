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
    /** 配置信息 */
    config: {
      /**站点信息 */
      site: {
        /**系统Logo */
        logo: './assets/mkh/logo.png',
        /**系统标题 */
        title: '',
        /**默认页，路由名称 */
        defaultPage: '',
      },
      /**认证和授权 */
      auth: {
        /**启用按钮权限 */
        enableButtonPermissions: true,
        /**启用验证码功能 */
        enableVerifyCode: true,
      },
      /**组件配置 */
      component: {
        /**加载动画 */
        loading: {
          background: 'rgba(255, 255, 255, 0.6)',
          spinner: 'el-icon-loading',
        },
        /**登录组件，默认是m-login-m */
        login: 'm',
      },
      /**系统操作，供系统内部使用，用户需要通过替换默认操作方法来实现自定义功能 */
      actions: {
        /**登录方法(异步) */
        login: null,
        /**刷新令牌 */
        refreshToken: null,
        /**获取验证码方法 */
        getVerifyCode: null,
        /**获取账户信息(异步) */
        getProfile: null,
      },
      /** 接口配置 */
      http: {
        /** 全局接口地址 */
        global: {
          baseURL: '',
        },
        /** 模块配置，会覆盖全局配置 */
        modules: {},
      },
    },
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
  }
