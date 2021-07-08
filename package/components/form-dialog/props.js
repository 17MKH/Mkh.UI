import { withProps as loading } from '../../composables/loading'

export default {
  ...loading,
  modelValue: Boolean,
  /** 表单提交方法 */
  action: {
    type: Function,
    default: null,
  },
  /** 表单模型 */
  model: {
    type: Object,
    default: null,
  },
  /** 验证规则 */
  rules: {
    type: Object,
    default: null,
  },
  /** 显示底部栏 */
  footer: {
    type: Boolean,
    default: true,
  },
  /** 显示保存按钮 */
  btnOk: {
    type: Boolean,
    default: true,
  },
  /** 保存按钮文本 */
  btnOkText: {
    type: String,
    default: '',
  },
  /** 保存按钮图标 */
  btnOkIcon: {
    type: String,
    default: 'save',
  },
  /** 显示重置按钮 */
  btnReset: {
    type: Boolean,
    default: true,
  },
  /** 重置按钮图标 */
  btnResetIcon: {
    type: String,
    default: 'reset',
  },
  /** 禁用表单 */
  disabled: Boolean,
  /** 关闭时重置表单 */
  resetOnClosed: {
    type: Boolean,
    default: true,
  },
  /** 表单提交成功后关闭对话框 */
  closeOnSuccess: {
    type: Boolean,
    default: true,
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
  /** 表单左侧外边距，有强迫症的希望左右空白区域对齐的可以使用该属性 */
  formMarginRight: {
    type: String,
    default: '50px',
  },
  /** 需要自动获取焦点的组件引用 */
  autoFocusRef: {
    type: Object,
  },
}
