/**
 *
 * @param {Object} cit 当前组件实例
 * @returns
 */
export default function (cit) {
  const { $loading } = cit
  const defaultOptions = MkhUI.config.component.$loading
  let loading

  const open = (text, options) => {
    loading = $loading(Object.assign({}, defaultOptions, { text: text || '正在加载数据，请稍后...' }, options))
  }

  const close = () => {
    loading.close()
  }

  return {
    open,
    close,
  }
}

/**
 * 属性
 */
export const withProps = {
  /** 加载动画文本 */
  loadingText: {
    type: String,
    default: null,
  },
  /** 加载动画背景色 */
  loadingBackground: {
    type: String,
    default: null,
  },
  /** 加载动画图标 */
  loadingSpinner: {
    type: String,
    default: null,
  },
}
