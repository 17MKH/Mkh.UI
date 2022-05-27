import { withProps as loading } from '../../composables/loading'
import headProps from '../head/props'

const elDrawerProps = {
  /** 是否显示 */
  modelValue: { type: Boolean, default: false },
  /** 是否需要遮罩层 */
  modal: { type: Boolean, default: true },
  /** Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true */
  appendToBody: { type: true, default: false },
  /** 是否在 Dialog 出现时将 body 滚动锁定 */
  lockScroll: { type: true, default: true },
  /** 自定义class */
  customClass: { type: [String, Array], default: null },
  /** Dialog 打开的延时时间，单位毫秒 */
  openDelay: { type: Number, default: 0 },
  /** Dialog 关闭的延时时间，单位毫秒 */
  closeDelay: { type: Number, default: 0 },
  /** 是否可以通过点击 modal 关闭 Dialog */
  closeOnClickModal: { type: true, default: true },
  /** 是否可以通过按下 ESC 关闭 Dialog */
  closeOnPressEscape: { type: true, default: true },
  /** 关闭前的回调，会暂停 Dialog 的关闭，function(done)，done 用于关闭 Dialog */
  beforeClose: { type: Function, default: null },
  /** 当关闭 Dialog 时，销毁其中的元素 */
  destroyOnClose: { type: true, default: false },
  /** Drawer 打开的方向 rtl / ltr / ttb / btt */
  direction: { type: String, default: 'rtl' },
  /** 显示关闭按钮 */
  showClose: { type: Boolean, default: true },
  /** 遮罩层的自定义类名 */
  modalClass: { type: String, default: '' },
  /** 设置 z-index */
  zIndex: { type: Number, default: 0 },
}

const mDrawerProps = {
  ...headProps,
  /** 显示头部 */
  header: { type: Boolean, default: true },
  /** 宽度 */
  width: { type: String, default: '30%' },
  /** 高度 */
  height: { type: String, default: '30%' },
  /** 不包含内边距 */
  noPadding: { type: Boolean, default: false },
  /** 不显示滚动条 */
  noScrollbar: { type: Boolean, default: false },
  /** 显示全屏按钮 */
  showFullscreen: { type: Boolean, default: true },
}

export default {
  ...loading,
  ...elDrawerProps,
  ...mDrawerProps,
}

export { elDrawerProps, mDrawerProps }
