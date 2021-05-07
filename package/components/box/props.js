import { loading } from '../../helpers/props'
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
    default: null,
  },
  /** 图标 */
  icon: {
    type: String,
    default: null,
  },
  /** 图标颜色 */
  iconColor: {
    type: String,
    default: null,
  },
  /** 高度 */
  height: {
    type: String,
    default: null,
  },
  /** 尺寸 */
  size: {
    type: String,
    default: '',
  },
  /** 是否显示水平滚动条 */
  horizontalScrollbar: {
    type: Boolean,
    default: false,
  },
  /** 显示加载动画 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 是否页模式 */
  page: {
    type: Boolean,
    default: false,
  },
  /** 不显示滚动条 */
  noScrollbar: {
    type: Boolean,
    default: false,
  },
  /** 没有内边距 */
  noPadding: {
    type: Boolean,
    default: false,
  },
  /** 显示折叠按钮 */
  showCollapse: Boolean,
  /** 显示全屏按钮 */
  showFullscreen: {
    type: Boolean,
    default: true,
  },
}
