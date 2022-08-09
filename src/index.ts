import mod from 'virtual:mkh-mod-doc'
import { useModuleCallback } from '@/index'
import api from './api'

mod.api = api

useModuleCallback(({ config }) => {
  const { login, getVerifyCode, getProfile, toggleSkin } = api.authorize

  /** 设置登录方法 */
  config.systemActions.login = login
  /** 设置获取验证码方法 */
  config.systemActions.getVerifyCode = getVerifyCode
  /** 设置获取账户信息方法 */
  config.systemActions.getProfile = getProfile
  /** 设置切换皮肤方法 */
  config.systemActions.toggleSkin = toggleSkin
})

export default mod
