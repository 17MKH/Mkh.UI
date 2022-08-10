import type { Size } from '@/types'

export interface SIZE_DEFINITIONS {
  /**
   * 大号
   */
  LARGE: Size
  /**
   * 默认尺寸
   */
  DEFAULT: Size
  /**
   * 小号
   */
  SMALL: Size
}

/**
 * 尺寸定义
 */
export const SIZE_DEFINITIONS: SIZE_DEFINITIONS = {
  LARGE: 'large',
  DEFAULT: 'default',
  SMALL: 'small',
}
