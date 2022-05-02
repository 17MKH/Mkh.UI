import { withProps as loading } from '../../composables/loading'
import headProps from '../head/props'

export default {
  ...loading,
  ...headProps,
  /** 显示头部 */
  header: { type: Boolean, default: false },
  /** 高度 */
  height: { type: String, default: null },
  /** 是否显示水平滚动条 */
  horizontalScrollbar: { type: Boolean, default: false },
  /** 是否页模式 */
  page: { type: Boolean, default: false },
  /** 不显示滚动条 */
  noScrollbar: { type: Boolean, default: false },
  /** 没有内边距 */
  noPadding: { type: Boolean, default: false },
  /** 显示折叠按钮 */
  showCollapse: { type: Boolean, default: false },
  /** 显示全屏按钮 */
  showFullscreen: { type: Boolean, default: false },
}
