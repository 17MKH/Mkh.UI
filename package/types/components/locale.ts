/**
 * 语言选项
 */
export declare type Locale = 'zh-cn' | 'en'

/**
 * 多语言信息
 */
export interface MkhLocaleMessages {
  /**
   * 语言名称
   */
  name: Locale
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
