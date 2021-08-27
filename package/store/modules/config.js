import _ from 'lodash'

const state = {
  /**站点信息 */
  site: {
    /**系统Logo */
    logo: './assets/mkh/logo.png',
    /**系统标题 */
    title: '',
    /**自定义首页地址 */
    home: '',
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
      background: 'rgba(255, 255, 255, 0.4)',
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
    /**切换皮肤 */
    toggleSkin: null,
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
  /**默认皮肤配置 */
  skin: null,
}

const mutations = {
  /**初始化 */
  init(state, config) {
    _.merge(state, config)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
