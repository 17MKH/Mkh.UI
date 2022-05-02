import { withProps as loading } from '../../composables/loading'

const elFormProps = {
  /** 表单模型 */
  model: { type: Object, required: true },
  /** 验证规则 */
  rules: { type: Object, default: null },
  /** 行内表单模式 */
  inline: { type: Boolean, default: false },
  /** 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 */
  labelWidth: { type: String, default: '100px' },
  /** 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 */
  labelPosition: { type: String, default: 'right' },
  /** 表单域标签的后缀 */
  labelSuffix: { type: String, default: '：' },
  /** 是否显示必填字段的标签旁边的红色星号 */
  hideRequiredAsterisk: { type: Boolean, default: false },
  /** 是否显示校验错误信息 */
  showMessage: { type: Boolean, default: true },
  /** 是否以行内形式展示校验信息 */
  inlineMessage: { type: Boolean, default: false },
  /** 是否在输入框中显示校验结果反馈图标 */
  statusIcon: { type: Boolean, default: false },
  /** 是否在 rules 属性改变后立即触发一次验证 */
  validateOnRuleChange: { type: Boolean, default: true },
  /** 用于控制该表单内组件的尺寸 'large' | 'default' | 'small' */
  size: { type: String, default: '' },
  /** 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部分已禁用 `` prop。 */
  disabled: { type: Boolean, default: false },
}

const mFormProps = {
  /** 不显示加载动画 */
  noLoading: { type: Boolean, default: false },
  /** 表单提交方法 */
  action: { type: Function, default: null },
  /** 自定义验证 */
  customValidate: { type: Function, default: null },
  /** 提交前的操作 */
  beforeSubmit: { type: Function, default: null },
  /** 禁用Enter键提交 */
  disabledEnter: { type: Boolean, default: false },
}

export default {
  ...loading,
  ...elFormProps,
  ...mFormProps,
}

export { elFormProps, mFormProps }
