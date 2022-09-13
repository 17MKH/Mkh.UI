import mod from 'virtual:mkh-mod-doc'
import { useAppCreatedService } from '@/index'
import api from './api'

//注册服务
useAppCreatedService(({ config }) => {
  const { login, getVerifyCode, getProfile, toggleSkin } = api.authorize

  config.systemActions = {
    login,
    getVerifyCode,
    getProfile,
    toggleSkin,
  }
})

export default mod

/**
 * 为什么模块中的 api 和 store要单独导出，因为这两个会在其它模块中使用，所以不能使用插件来动态导入，否则无法获得类型推导功能
 */
export { api }
