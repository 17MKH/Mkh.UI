import { useI18n as usei18n } from 'vue-i18n'
import { Locale, MkhMessagesSchema } from '@/index'
import { DocMessagesSchema } from './lang/zh-cn/index'

const useI18n = () => {
  return usei18n<
    {
      message: {
        mkh: MkhMessagesSchema
        mod: {
          doc: DocMessagesSchema
        }
      }
    },
    Locale
  >()
}

export { useI18n }
