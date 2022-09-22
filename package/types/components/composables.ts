import type { Ref } from 'vue'

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
