/**
 * 顶部工具栏定义
 */
export interface ToolbarDefinition {
  /**
   * 唯一编码
   */
  code: string
  /**
   * 工具栏显示名称(多语言Key)
   */
  label: string
  /**
   * 是否显示
   */
  show: boolean
  /**
   * 排序
   */
  sort: number
}
