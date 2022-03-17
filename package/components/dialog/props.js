import { withProps as loading } from '../../composables/loading'

export default {
  ...loading,
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
  /** 宽度 */
  height: {
    type: String,
    default: '',
  },
  /** 尺寸 */
  size: {
    type: String,
    default: '',
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
  /** 不包含内边距 */
  noPadding: Boolean,
  /** 不显示滚动条 */
  noScrollbar: Boolean,
  /** 为 Dialog 启用可拖拽功能 */
  draggable: {
    type: Boolean,
    default: false,
  },
  /** Dialog CSS 中的 margin-top 值 */
  top: {
    type: String,
    default: '50px',
  },
}
