import { loading } from '../../helpers/props'
export default {
  /** 数据列 */
  cols: {
    type: Array,
    required: true,
  },
  /** 查询参数模型 */
  queryModel: {
    type: Object,
    default: null,
  },
  /** 查询方法 */
  queryMethod: {
    type: Function,
    required: true,
  },
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 图标 */
  icon: {
    type: String,
    default: 'list',
  },
  /**图标颜色 */
  iconColor: {
    type: String,
    default: '',
  },
  /** 宽度 */
  width: {
    type: String,
    default: '100%',
  },
  /** 高度 */
  height: {
    type: String,
    default: '100%',
  },
  /** 尺寸 */
  size: {
    type: String,
    default: '',
  },
  /** 分页配置 */
  pagination: {
    type: Object,
    default: null,
  },
  /** 多选 */
  multiple: Boolean,
  /** 显示查询按钮 */
  showSearchBtn: {
    type: Boolean,
    default: true,
  },
  /** 搜索按钮文本 */
  searchBtnText: {
    type: String,
    default: '',
  },
  /** 显示重置按钮 */
  showResetBtn: {
    type: Boolean,
    default: true,
  },
  /** 重置按钮文本 */
  resetBtnText: {
    type: String,
    default: '',
  },
  /** 显示删除按钮 */
  showDeleteBtn: Boolean,
  /** 删除按钮文本 */
  deleteBtnText: {
    type: String,
    default: '',
  },
  /** 删除方法 */
  deleteMethod: {
    type: Function,
    default: null,
  },
  /** 不显示刷新按钮 */
  noRefresh: Boolean,
  /** 不显示全屏按钮 */
  noFullscreen: Boolean,
  /** 不显示查询栏 */
  noQuerybar: Boolean,
  /** 创建后是否查询 */
  queryOnCreated: {
    type: Boolean,
    default: true,
  },
  /** 显示索引 */
  index: {
    type: Boolean,
    default: true,
  },
  /** 自定义索引计算方法 */
  indexMethod: {
    type: Function,
    default: null,
  },
  /** 禁用设置列功能 */
  disableSetColumn: Boolean,
  /** 对应ElementPlus中表格的row-key，默认id */
  rowKey: {
    type: String,
    default: 'id',
  },
  /** 空数据时显示的文本内容 */
  emptyText: {
    type: String,
    default: null,
  },
  /** 是否在表尾显示合计行 */
  showSummary: Boolean,
  /** 合计行第一列的文本 */
  sumText: {
    type: String,
    default: null,
  },
  /** 自定义的合计计算方法 */
  summaryMethod: {
    type: Function,
    default: null,
  },
  /** 合并行或列的计算方法 */
  spanMethod: {
    type: Function,
    default: null,
  },
  /** 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 */
  defaultExpandAll: Boolean,
  /** 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。 */
  expandRowKeys: {
    type: Array,
    default: null,
  },
  /** tooltip effect 属性 */
  tooltipEffect: {
    type: String,
    default: null,
  },
  /** 展示树形数据时，树节点的缩进 */
  indent: {
    type: Number,
    default: 16,
  },
  /** 是否懒加载子节点数据 */
  lazy: Boolean,
  /** 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 */
  load: {
    type: Function,
    default: null,
  },
  /** 渲染嵌套数据的配置选项 */
  treeProps: {
    type: Object,
    default() {
      return { hasChildren: 'hasChildren', children: 'children' }
    },
  },
  ...loading,
}
