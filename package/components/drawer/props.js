import { withProps } from '../../composables/loading'
export default {
  ...withProps,
  modelValue: Boolean,
  /** 显示头部 */
  header: {
    type: Boolean,
    default: true,
  },
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 图标 */
  icon: {
    type: String,
    default: '',
  },
  /**图标颜色 */
  iconColor: {
    type: String,
    default: '',
  },
  /**Drawer 打开的方向,right / left / top / bottom */
  direction: {
    type: String,
    default: 'right',
  },
  /** 宽度 */
  width: {
    type: String,
    default: '400px',
  },
  /** 高度 */
  height: {
    type: String,
    default: '',
  },
  /** 尺寸 */
  size: {
    type: String,
    default: '',
  },
  /** 自定义类名 */
  customClass: {
    type: String,
    default: '',
  },
  /** 是否需要遮罩层 */
  modal: {
    type: Boolean,
    default: true,
  },
  /** 是否可以通过点击 modal 关闭 Dialog */
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  /** 显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /** 显示全屏按钮 */
  showFullscreen: {
    type: Boolean,
    default: true,
  },
  /** 关闭前的回调，会暂停 Dialog 的关闭 */
  beforeClose: {
    type: Function,
    default: null,
  },
  /** 关闭时销毁 Dialog 中的元素 */
  destroyOnClose: Boolean,
  /** Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true */
  appendToBody: {
    type: Boolean,
    default: true,
  },
  /** 不包含内边距 */
  noPadding: Boolean,
  /** 不显示滚动条 */
  noScrollbar: Boolean,
  /** 显示加载动画 */
  loading: Boolean,
}
