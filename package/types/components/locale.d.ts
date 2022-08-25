import { LocaleMessages } from 'vue-i18n'

/**
 * 语言选项
 */
export declare type locale = 'zh-cn' | 'en'

/**
 * 多语言信息
 */
export interface MkhLocaleMessages extends LocaleMessages {
  /**
   * 语言名称
   */
  name: locale
  /**
   * 语言显示名称
   */
  label: string
  /**
   * Element Plus 语言信息
   */
  el: {}
  /**
   * 17MKH UI框架的语言信息
   */
  mkh: {}
  /**
   * 路由语言信息
   */
  routes: {}
  /**
   * 模块语言信息
   */
  mod: {
    [key: string]: string | {}
  }
  /**
   * 皮肤语言信息
   */
  skin: {}
  [key: string]: {}
}

export interface MkhLocaleMessagesGroup {
  en: MkhLocaleMessages
  'zh-cn': MkhLocaleMessages
  [key: string]: MkhLocaleMessages
}
