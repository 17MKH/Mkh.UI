import { ElLoading } from 'element-plus'
import { nextTick } from 'vue'
import { useConfigStore } from '@/store'
import { useI18n } from './i18n'

export interface LoadingObject {
  /**
   *
   * @param text - 显示文本
   * @param options - 选项
   */
  open: (
    text?: string,
    options?: {
      /**
       * 加载动画配景色
       */
      background: string
      /**
       * 加载动画图标
       */
      spinner: string
    }
  ) => void
  /**
   * 关闭
   */
  close: () => void
}

/**
 * 使用加载中动画
 * @returns
 */
export const useLoading = function (): LoadingObject {
  //@ts-ignore
  const { t } = useI18n()

  const confitSotre = useConfigStore()

  let loading: { close: () => void }

  const open = (
    text?: string,
    options?: {
      /**
       * 加载动画配景色
       */
      background: string
      /**
       * 加载动画图标
       */
      spinner: string
    }
  ) => {
    loading = ElLoading.service(Object.assign({}, confitSotre.component.loading, { text: text || t('mkh.loading_text') }, options))
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
