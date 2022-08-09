/**
 * 语言选项
 */
export declare type locale = 'zh-cn' | 'en'

/**
 * 多语言信息
 */
export interface LocaleMessage {
  el: {}
  ui: {}
  mod: {
    [route: string]: string | {}
    routes: {}
  }
  skiny: {}
}
