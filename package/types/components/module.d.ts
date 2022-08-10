import { PageDefinition } from './page'

/**
 * 模块定义
 */
export interface ModuleDefinition {
  /**
   * 编号
   */
  id: number
  /**
   * 唯一编码
   */
  code: string
  /**
   * 版本号
   */
  version: string
  /**
   * 显示文本
   */
  label?: string
  /**
   * 图标
   */
  icon?: string
  /**
   * 说明
   */
  description: string
  /**
   * 页面列表
   */
  pages: PageDefinition[]
  /**
   * 全局组件列表
   */
  components: {
    /**
     * 组件名称
     */
    name: string
    /**
     * 组件模板
     */
    component: Component
  }[]
}
