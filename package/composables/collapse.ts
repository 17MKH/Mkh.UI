import { Ref, ref } from 'vue'

/**
 * 折叠事件触发器
 */
export interface CollapseEmit {
  (e: 'collapse-change', isCollapse: boolean): void
}
/**
 * 折叠对象
 */
export interface CollapseObject {
  /**
   * 是否折叠
   */
  isCollapse: Ref<boolean>
  /**
   * 打开折叠
   */
  openCollapse: () => void
  /**
   * 关闭折叠
   */
  closeCollapse: () => void
  /**
   * 切换折叠状态
   */
  toggleCollapse: () => void
}

/**
 * 使用折叠
 * @param emit - 事件触发器
 * @returns
 */
export const useCollapse = function (emit: CollapseEmit): CollapseObject {
  const isCollapse = ref(false)

  const openCollapse = () => {
    isCollapse.value = false
    emit('collapse-change', isCollapse.value)
  }

  const closeCollapse = () => {
    isCollapse.value = true
    emit('collapse-change', isCollapse.value)
  }

  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
    emit('collapse-change', isCollapse.value)
  }

  return {
    /**
     * 是否折叠
     */
    isCollapse,
    /**
     * 打开折叠
     */
    openCollapse,
    /**
     * 关闭折叠
     */
    closeCollapse,
    /**
     * 切换折叠状态
     */
    toggleCollapse,
  }
}
