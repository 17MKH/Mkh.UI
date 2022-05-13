export default {
  /** 模式 'day', 'month', 'year' */
  mode: {
    type: String,
    default: 'month',
    validator(value) {
      return ['month', 'year'].includes(value)
    },
  },
  /** 开始日期 */
  start: {
    type: Date,
  },
  /** 结束日期 */
  end: {
    type: Date,
  },
}
