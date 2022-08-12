import { ElMessage, ElMessageBox, ElMessageBoxOptions } from 'element-plus'
import useI18n from './i18n'

// 显示时长
const duration = 2500

export default function () {
  const { t } = useI18n()

  const message = (message: string, type: 'success' | 'warning' | 'info' | 'error', onClose?: () => void) => {
    return ElMessage({
      message,
      type,
      showClose: true,
      duration,
      onClose,
    })
  }

  const success = (msg: string, onClose?: () => void) => {
    return message(msg, 'success', onClose)
  }

  const warning = (msg: string, onClose?: () => void) => {
    return message(msg, 'warning', onClose)
  }

  const error = (msg: string, onClose?: () => void) => {
    return message(msg, 'error', onClose)
  }

  const confirm = (msg: string, title: string, options: ElMessageBoxOptions) => {
    return ElMessageBox.confirm(
      msg,
      title || t('mkh.warning'),
      Object.assign(
        {
          confirmButtonText: t('mkh.ok'),
          cancelButtonText: t('mkh.cancel'),
          type: 'warning',
        },
        options
      )
    )
  }

  return { success, warning, error, confirm }
}
