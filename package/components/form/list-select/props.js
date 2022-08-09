export default {
  /** 绑定值 */
  modelValue: {
    type: Object,
    required: true,
  },
  /** 显示文本 */
  label: {
    type: Array,
    default: null,
  },
  /** 用于作为文本展示的字段名称 */
  labelKey: {
    type: String,
    default: 'name',
  },
  /** 多选 */
  multiple: Boolean,
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
  /** 分页配置 */
  pagination: {
    type: Object,
    default() {
      return {
        layout: 'total, prev, pager, next',
      }
    },
  },
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
  /** 不显示查询栏 */
  noQuerybar: Boolean,
  /** 查询前执行的函数，该函数调用时第一个参数是查询参数对象，可在该函数内对参数进行调整 */
  beforeQuery: Function,
  /** 宽度 */
  dialogWidth: {
    type: String,
    default: '700px',
  },
  /** 宽度 */
  dialogHeight: {
    type: String,
    default: '800px',
  },
}
