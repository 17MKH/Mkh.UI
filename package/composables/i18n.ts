import type { locales } from '@/locales'
import { useI18n as usei18n } from 'vue-i18n'
import { MkhMessagesSchema } from '@/locales/lang/zh-cn'

const useI18n = () => {
  return usei18n<
    {
      message: {
        el
        /**
         * 框架多语言定义
         */
        mkh: MkhMessagesSchema
      }
    },
    locales
  >()
}

export { useI18n }
