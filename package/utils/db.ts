/**本地存储库 */

//键名前缀
const prefix = 'mkh-'

export default {
  /**
   * 设置
   */
  set(key: string, value: any) {
    localStorage.setItem(`${prefix}${key}`, JSON.stringify(value))
  },
  /**
   * 获取
   */
  get<T>(key: string) {
    const str = localStorage.getItem(`${prefix}${key}`)
    if (str) {
      return JSON.parse(str) as T
    }

    return undefined
  },
  /**
   * 删除令牌
   */
  remove(key: string) {
    localStorage.removeItem(`${prefix}${key}`)
  },
  /**
   * 清除全部
   */
  clearAll() {
    localStorage.clear()
  },
}
