import { withProps as loading } from '../../composables/loading'
import boxProps from '../box/props'
import { elFormProps, mFormProps } from '../form/props'

export default {
  ...loading,
  ...boxProps,
  ...elFormProps,
  ...mFormProps,
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
}
