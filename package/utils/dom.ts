/**
 * 绑定事件
 */
const on = (function () {
  return function (element, event, handler) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false)
    }
  }
})()

/**
 * 删除事件
 */
const off = (function () {
  return function (element, event, handler) {
    if (element && event) {
      element.removeEventListener(event, handler, false)
    }
  }
})()

/**
 * 判断是否含有指定的class
 * @param el - Dom元素
 * @param cls - class名称
 * @returns
 */
const hasClass = (el: HTMLElement, cls: string) => {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export default {
  on,
  off,
  hasClass,
}
