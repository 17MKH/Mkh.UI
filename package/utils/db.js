/**本地存储库 */

//键名前缀
const prefix = 'mkh-'

export default {
  /**
   * @description 设置
   */
  set(key, value) {
    localStorage.setItem(`${prefix}${key}`, JSON.stringify(value))
  },
  /**
   * @description 获取
   */
  get(key) {
    return JSON.parse(localStorage.getItem(`${prefix}${key}`))
  },
  /**
   * @description 删除令牌
   */
  remove(key) {
    localStorage.removeItem(`${prefix}${key}`)
  },
  /**
   * @description 清除全部
   */
  clearAll() {
    localStorage.clear()
  },
}
