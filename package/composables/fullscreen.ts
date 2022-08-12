import type { Component, Ref } from 'vue'
import { ref } from 'vue'

export default function (emit: { (e: 'fullscreen-change', isFullscreen: Ref<boolean>): void }) {
  const isFullscreen = ref(false)

  const openFullscreen = () => {
    isFullscreen.value = true
    emit('fullscreen-change', isFullscreen)
  }

  const closeFullscreen = () => {
    isFullscreen.value = false
    emit('fullscreen-change', isFullscreen)
  }

  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
    emit('fullscreen-change', isFullscreen)
  }

  return {
    isFullscreen,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
  }
}

export interface FullscreenMixins {
  /***
   * 开启全屏
   */
  openFullscreen: () => {}
  /**
   * 关闭全屏
   */
  closeFullscreen: () => {}
  /**
   * 切换全屏
   */
  toggleFullscreen: () => {}
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
