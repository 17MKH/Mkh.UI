import type { Config } from '@/types'
import formatters from './utils/formatters'

const defaultConfig: Config = {
  site: {
    title: '',
    logo: './assets/mkh/logo.png',
  },
  auth: {
    enableButtonPermissions: true,
    enableVerifyCode: true,
  },
  component: {
    loading: {
      background: 'rgba(255, 255, 255, 0.4)',
      spinner: 'el-icon-loading',
    },
    login: 'm',
    dialog: {
      draggable: true,
    },
    list: {
      formatters,
    },
  },
}

/** 默认配置信息 */
export default defaultConfig
