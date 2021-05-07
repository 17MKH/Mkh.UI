//列选项配置
export const columnOptions = {
  /** 控制列是否显示 */
  show: true,
  /** 对应列内容的字段名 */
  prop: '',
  /** 显示的列标题 */
  label: '',
  /** 对应列的宽度 */
  width: '',
  /** 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
  minWidth: '',
  /** 列是否固定在左侧或者右侧，true 表示固定在左侧，可选：true, left, right */
  fixed: '',
  /** 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 */
  sortable: false,
  /** 用来格式化内容 */
  formatter: null,
  // 当内容过长被隐藏时显示 tooltip
  showOverflowTooltip: true,
  /** 对齐方式 */
  align: 'center',
  /** 表头对齐方式，若不设置该项，则使用表格的对齐方式 */
  headerAlign: 'center',
  /** 列的 className */
  className: '',
  /** 当前列标题的自定义类名 */
  labelClassName: '',
}

//默认分页配置
export const paginationOptions = {
  small: false,
  background: true,
  pageSizes: [10, 15, 30, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
}
