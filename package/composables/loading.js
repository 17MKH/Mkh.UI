import { ElLoading } from 'element-plus'
import { nextTick } from 'vue'
import { i18n } from '../locales'

export default function () {
  const defaultOptions = mkh.store.state.app.config.component.loading
  let loading

  const open = (text, options) => {
    loading = ElLoading.service(Object.assign({}, defaultOptions, { text: text || i18n.global.t('mkh.loading_text') }, options))
  }

  const close = () => {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loading.close()
    })
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
  /** 显示加载动画 */
  loading: {
    type: Boolean,
    default: false,
  },
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
