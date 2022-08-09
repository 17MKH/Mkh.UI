export default {
  /** 类型 primary/success/warning/danger/info */
  type: { type: String, default: '' },
  /** 是否文本按钮 */
  text: { type: Boolean, default: false },
  /** 是否为链接按钮 */
  link: { type: Boolean, default: false },
  /** 尺寸 */
  size: { type: String, default: null },
  /** 是否朴素按钮 */
  plain: { type: Boolean, default: false },
  /** 是否圆角按钮 */
  round: { type: Boolean, default: false },
  /** 是否圆形按钮 */
  circle: { type: Boolean, default: false },
  /** 是否加载中状态 */
  loading: { type: Boolean, default: false },
  /** 是否禁用状态 */
  disabled: { type: Boolean, default: false },
  /** 是否默认聚焦 */
  autofocus: { type: Boolean, default: false },
  /** 原生 type 属性 button/submit/reset */
  nativeType: { type: String, default: 'button' },
  /** 图标 */
  icon: { type: String, default: null },
  /** 按钮编码，用于按钮权限控制 */
  code: { type: String, default: '' },
  /** 跳转路由，如果设置了该属性，无法再监听click事件 */
  to: { type: [String, Object], default: null },
}
