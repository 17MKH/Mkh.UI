import { withProps as loading } from '../../composables/loading'
import { elDialogProps, mDialogProps } from '../dialog/props'
import { elFormProps, mFormProps } from '../form/props'

export default {
  ...loading,
  ...elDialogProps,
  ...mDialogProps,
  ...elFormProps,
  ...mFormProps,
  /** 显示底部 */
  footer: { type: Boolean, default: true },
  /** 显示保存按钮 */
  btnOk: { type: Boolean, default: true },
  /** 保存按钮文本 */
  btnOkText: { type: String, default: '' },
  /** 保存按钮图标 */
  btnOkIcon: { type: String, default: 'save' },
  /** 显示重置按钮 */
  btnReset: { type: Boolean, default: true },
  /** 重置按钮图标 */
  btnResetIcon: { type: String, default: 'reset' },
  /** 关闭时重置表单 */
  resetOnClosed: { type: Boolean, default: true },
  /** 表单提交成功后关闭对话框 */
  closeOnSuccess: { type: Boolean, default: true },
  /** 需要自动获取焦点的组件引用 */
  autoFocusRef: { type: Object, default: null },
  /** 自定义成功提示消息 */
  successMessage: { type: String, default: null },
}
