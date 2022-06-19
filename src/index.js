/** 导入模块，自动加载模块中的页面pages和全局组件components */
import mod from '$mkh-mod-doc'

/** 模块注册回调函数，当vue根实例挂载前调用 */
mod.callback = ({ app, config }) => {
  const { login, getVerifyCode, getProfile, toggleSkin } = mkh.api.doc.authorize

  /** 设置登录方法 */
  config.actions.login = login
  /** 设置获取验证码方法 */
  config.actions.getVerifyCode = getVerifyCode
  /** 设置获取账户信息方法 */
  config.actions.getProfile = getProfile
  /** 设置切换皮肤方法 */
  config.actions.toggleSkin = toggleSkin
}
