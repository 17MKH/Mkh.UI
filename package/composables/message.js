import { ElMessage, ElMessageBox } from 'element-plus'
import { i18n } from '../locales'

// 显示时长
const duration = 2500

export default function () {
  const message = (message, type, onClose) => {
    return ElMessage({
      message,
      type,
      showClose: true,
      duration,
      onClose,
    })
  }

  const success = (msg, onClose) => {
    return message(msg, 'success', onClose)
  }

  const warning = (msg, onClose) => {
    return message(msg, 'warning', onClose)
  }

  const error = (msg, onClose) => {
    return message(msg, 'error', onClose)
  }

  const confirm = (msg, title, options) => {
    return ElMessageBox.confirm(
      msg,
      title || i18n.global.t('mkh.warning'),
      Object.assign(
        {
          confirmButtonText: i18n.global.t('mkh.ok'),
          cancelButtonText: i18n.global.t('mkh.cancel'),
          type: 'warning',
        },
        options
      )
    )
  }

  return { success, warning, error, confirm }
}
