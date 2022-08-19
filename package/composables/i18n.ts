import type { locales } from '@/locales'
import { useI18n as usei18n } from 'vue-i18n'
import { MessagesSchema } from '@/locales/lang/zh-cn'

const useI18n = () => {
  return usei18n<{ message: MessagesSchema }, locales>()
}

export { useI18n }
