import { FullscreenMixins } from '@/types'
import type { Component, Ref } from 'vue'
import { ref } from 'vue'

export interface FullscreenEmit {
  (e: 'fullscreen-change', isFullscreen: boolean): void
}

/**
 * 全屏对象
 */
export interface FullscreenObject {
  /**
   * 是否全屏
   */
  isFullscreen: Ref<boolean>
  /**
   * 开启全屏
   */
  openFullscreen: () => void
  /**
   * 关闭全屏
   */
  closeFullscreen: () => void
  /**
   * 切换全屏
   */
  toggleFullscreen: () => void
}

/**
 * 使用全屏
 * @param emit - 事件触发器
 * @returns
 */
export const useFullscreen = function (emit: FullscreenEmit): FullscreenObject {
  const isFullscreen = ref(false)

  const openFullscreen = () => {
    isFullscreen.value = true
    emit('fullscreen-change', isFullscreen.value)
  }

  const closeFullscreen = () => {
    isFullscreen.value = false
    emit('fullscreen-change', isFullscreen.value)
  }

  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
    emit('fullscreen-change', isFullscreen.value)
  }

  return {
    isFullscreen,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
  }
}

export const fullscreenMixins = (componentRef: Ref<Component & FullscreenMixins>) => {
  return {
    openFullscreen() {
      componentRef.value.openFullscreen()
    },
    closeFullscreen() {
      componentRef.value.closeFullscreen()
    },
    toggleFullscreen() {
      componentRef.value.toggleFullscreen()
    },
  }
}
