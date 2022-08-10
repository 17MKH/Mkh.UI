import { Component } from 'vue'

/**
 * 尺寸
 */
export declare type Size = 'large' | 'default' | 'small'

/**
 * 皮肤定义
 */
export interface SkinDefinition {
  /**
   * 名称
   */
  name: string
  /**
   * 唯一编码
   */
  code: string
  /**
   * 皮肤预览图的路径，一个url地址或者是base64
   */
  preview: string
  /**
   * 皮肤支持的主题
   */
  themes: {
    /**
     * 主题名称
     */
    name: string
    /**
     * 色值
     */
    color: string
  }[]
}

/**
 * 皮肤实例
 */
export interface Skin {
  /**
   * 名称
   */
  name: string
  /**
   * 编码
   */
  code: string
  /**
   * 主题
   */
  theme: string
  /**
   * 尺寸
   * @remarks 与Element Plus提供的尺寸保持一致，large / default /small
   */
  size: Size
}
