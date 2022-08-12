import { ElNotification } from 'element-plus'
import useI18n from './i18n'

// 显示时长
const duration = 2500

export default function () {
  const { t } = useI18n()

  const notification = (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error', onClose?: () => void) => {
    return ElNotification({
      title,
      message,
      type,
      showClose: true,
      duration,
      onClose,
    })
  }

  const success = (msg: string, title?: string, onClose?: () => void) => {
    return notification(title || t('mkh.success'), msg, 'success', onClose)
  }

  const warning = (msg: string, title?: string, onClose?: () => void) => {
    return notification(title || t('mkh.warning'), msg, 'warning', onClose)
  }

  const error = (msg: string, title?: string, onClose?: () => void) => {
    return notification(title || t('mkh.error'), msg, 'error', onClose)
  }

  const info = (msg: string, title?: string, onClose?: () => void) => {
    return notification(title || t('mkh.info'), msg, 'info', onClose)
  }

  return { success, warning, error, info }
}
