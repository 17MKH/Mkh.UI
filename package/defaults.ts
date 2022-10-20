import type { BootstrapOptions, Config, JwtCredential, Profile, Skin } from '@/types'
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
  systemActions: {},
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

/** 默认启动配置 */
export const defaultBootstrapOptions: BootstrapOptions = {
  /** 多语言配置 */
  locale: {
    /** 默认语言 */
    default: 'zh-cn',
    /** 备用语言 */
    fallback: 'zh-cn',
    messages: {
      'zh-cn': {
        name: 'zh-cn',
        label: '简体中文',
        mkh: {},
        el: {},
        routes: {},
        skin: {},
        mod: {},
      },
      en: {
        name: 'en',
        label: 'English',
        mkh: {},
        el: {},
        routes: {},
        skin: {},
        mod: {},
      },
    },
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
}
