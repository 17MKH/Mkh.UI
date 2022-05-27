import { ElNotification } from 'element-plus'

// 显示时长
const duration = 3000

export default function () {
  const notification = (title, message, type) => {
    return ElNotification({
      title,
      message,
      type,
      showClose: true,
      duration,
    })
  }

  const success = (msg, title) => {
    return notification(title || '成功', msg, 'success')
  }

  const warning = (msg, title) => {
    return notification(title || '警告', msg, 'warning')
  }

  const error = (msg, title) => {
    return notification(title || '失败', msg, 'error')
  }

  const info = (msg, title) => {
    return notification(title || '提醒', msg, 'info')
  }

  return { success, warning, error, info }
}
