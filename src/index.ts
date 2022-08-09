import mod from 'virtual:mkh-mod-doc'
import { useModule, useCallback } from '../package/index.js'
import api from './api'
import store from './store'

//注册模块
useModule(mod)

//注册回调函数
useCallback(({ config }) => {
  const { login, getVerifyCode, getProfile, toggleSkin } = api.authorize

  if (config.systemActions) {
    /** 设置登录方法 */
    config.systemActions.login = login
    /** 设置获取验证码方法 */
    config.systemActions.getVerifyCode = getVerifyCode
    /** 设置获取账户信息方法 */
    config.systemActions.getProfile = getProfile
    /** 设置切换皮肤方法 */
    config.systemActions.toggleSkin = toggleSkin
  }
})

/**
 * 为什么 api 和 store要单独导出，因为这两个会在其它模块中使用，所以不能使用插件来动态导入，否则无法获得代码提示功能
 */
export { api, store }
