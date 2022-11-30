import type { Locale, size } from '@/types'

export interface SIZE_DEFINITIONS {
  /**
   * 大号
   */
  LARGE: size
  /**
   * 默认尺寸
   */
  DEFAULT: size
  /**
   * 小号
   */
  SMALL: size
}

/**
 * 尺寸定义
 */
export const SIZE_DEFINITIONS: SIZE_DEFINITIONS = {
  LARGE: 'large',
  DEFAULT: 'default',
  SMALL: 'small',
}

export interface LOCALE_DEFINITIONS {
  ZhCN: Locale
  En: Locale
  Th: Locale //泰语
}

/**
 * 语言定义
 */
export const LOCALE_DEFINITIONS = {
  ZhCN: 'zh-cn',
  En: 'en',
  Th: 'th', //泰语
}
