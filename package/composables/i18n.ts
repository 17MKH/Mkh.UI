import { useI18n } from 'vue-i18n'
import { MessagesSchema } from '@/locales/lang/zh-cn'

export default function () {
  const { t } = useI18n<{ message: MessagesSchema }>()

  return { t }
}
