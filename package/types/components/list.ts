/**
 * 行
 */
export interface Row {
  /**
   * 主键
   */
  id: string | number
  [key: string]: any
}

/**
 * 格式化函数
 */
export interface FormatterFunction {
  (val: any, row: Row, column: Column, params?: any): string
}

/**
 * 列
 */
export type Column = {
  /** 对应列内容的字段名 */
  prop: string
  /** 显示的列标题 */
  label: string
} & Partial<{
  /** 控制列是否显示 */
  show: boolean
  /** 对应列的宽度 */
  width: string
  /** 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
  minWidth: string
  /** 列是否固定在左侧或者右侧，true 表示固定在左侧，可选：true, left, right */
  fixed: boolean
  /** 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 */
  sortable: boolean
  /** 用来格式化内容 */
  formatter: FormatterFunction | { type: string; params?: any } | 'icon'
  // 当内容过长被隐藏时显示 tooltip
  showOverflowTooltip: boolean
  /** 对齐方式 */
  align: 'left' | 'center' | 'right'
  /** 表头对齐方式，若不设置该项，则使用表格的对齐方式 */
  headerAlign: 'left' | 'center' | 'right'
  /** 列的 className */
  className: string
  /** 当前列标题的自定义类名 */
  labelClassName: string
  /** 是否在展开区域展示 */
  expand: boolean
}>
