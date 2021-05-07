import { loading } from '../../helpers/props'
export default {
  ...loading,
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
}
