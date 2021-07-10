import { ElMessage, ElMessageBox } from 'element-plus'

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
    return ElMessageBox.alert(
      msg,
      title || '提示',
      Object.assign(
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
        options
      )
    )
  }

  return { success, warning, error, confirm }
}
