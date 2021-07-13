import { withProps as loading } from '../../composables/loading'

export default {
  ...loading,
  /** 不显示加载动画 */
  noLoading: Boolean,
  /** 表单提交方法 */
  action: {
    type: Function,
    default: null,
  },
  /** 表单模型 */
  model: {
    type: Object,
    required: true,
  },
  /** 验证规则 */
  rules: {
    type: Object,
    default: null,
  },
  /** 标签的宽度 */
  labelWidth: {
    type: String,
    default: '100px',
  },
  /** 自定义验证 */
  customValidate: {
    type: Function,
    default: null,
  },
  /** 尺寸 */
  size: {
    type: String,
    default: '',
  },
  /** 提交前的操作 */
  beforeSubmit: Function,
}
