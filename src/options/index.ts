import type { BootstrapOptions } from '@/types'
import { useBootstrapOptions } from '@/index'
import messages_zh_cn from './locale.zh-cn'
import messages_en from './locale.en'
import messages_th from './locale.th'

const options: BootstrapOptions = {
  locale: {
    messages: {
      'zh-cn': messages_zh_cn,
      en: messages_en,
      'th': messages_th,
    },
  },
  http: {
    global: {
      baseURL: '',
    },
  },
}

useBootstrapOptions(options)

export type MessageSchema = typeof messages_zh_cn
