import { App } from 'vue'
import { locale, MkhLocaleMessagesGroup } from './locale'
import { Config } from './config'

/**
 * 接口配置项
 */
export interface BootstrapHttpOptions {
  /**
   * 接口地址
   */
  baseURL: string
}

/**
 * 启动配置项
 */
export interface BootstrapOptions {
  /**
   * 多语言配置
   */
  locale: {
    /**
     * 默认语言，默认中文
     */
    default?: locale
    /**
     * 备用语言
     */
    fallback?: locale
    /**
     * 多语言列表
     */
    messages: MkhLocaleMessagesGroup
  }
  /**
   * 接口配置
   */
  http: {
    /**
     * 全局接口地址
     *
     * @remarks
     *
     * 当未给模块指定接口配置时，使用全局接口配置
     */
    global: BootstrapHttpOptions
    /**
     * 模块配置
     *
     * @remarks
     *
     * 模块的接口配置优先级高于全局配置
     */
    modules?: {
      [key: string]: BootstrapHttpOptions
    }
  }
}

/**
 * 应用服务
 */
export interface AppService {
  (options: { app: App<Element>; config: Config; options: BootstrapOptions }): void
}
