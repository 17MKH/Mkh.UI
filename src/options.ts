import type { BootstrapOptions, MkhLocaleMessages } from '@/types'
import messages_zh_cn from './options.locale.zh-CN'
import messages_en from './options.locale.en'

const options: BootstrapOptions = {
  locale: {
    messages: {
      'zh-cn': messages_zh_cn as MkhLocaleMessages,
      en: messages_en as MkhLocaleMessages,
    },
  },
  http: {
    global: {
      baseURL: '',
    },
  },
}
export type MessageSchema = typeof messages_zh_cn

export default options
