import type { Config, JwtCredential, Profile, Skin } from '@/types'
import formatters from './utils/formatters'
import { SIZE_DEFINITIONS } from '@/utils/constants'

export const defaultSkin: Skin = {
  name: '简约',
  code: 'brief',
  theme: 'dark',
  size: SIZE_DEFINITIONS.DEFAULT,
}

/**
 * 默认配置信息
 */
export const defaultConfig: Config = {
  site: {
    title: '',
    logo: './assets/mkh/logo.png',
    homePage: '',
    profilePage: '',
    menus: [],
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
  skin: defaultSkin,
}

/**
 * 默认账户信息
 */
export const defaultProfile: Profile = {
  accountId: '',
  username: '',
  nickname: '',
  avatar: '',
  menus: [],
  permissions: [],
  routeMenus: [],
  buttons: [],
  skin: defaultSkin,
}

/**
 * 默认凭证
 */
export const defaultCredential: JwtCredential = {
  accountId: '',
  accessToken: '',
  refreshToken: '',
  expiresIn: 0,
  loginTime: 0,
}
