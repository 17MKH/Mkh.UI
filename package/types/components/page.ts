import type { Component } from 'vue'
import { Breadcrumb, Button, PermissionCode } from './menu'

/**
 * 页面定义
 */
export interface PageDefinition {
  /**
   * 图标
   */
  icon: string
  /**
   * 名称
   *
   * @remarks
   *
   * 该名称会在页面转路由时作为路由的名称使用
   */
  name: string
  /**
   * 路径
   *
   * @remarks
   *
   * 该路径会在页面转路由时作为路由的路径使用
   */
  path: string
  /**
   * 是否在框架内显示
   */
  inFrame?: boolean
  /**
   * 是否隐藏菜单
   */
  hideMenu?: boolean
  /**
   * 是否进行权限校验
   */
  permissionVerify?: boolean
  /**
   * 绑定权限列表
   */
  permissions?: PermissionCode[]
  /**
   * 按钮
   */
  buttons?: {
    [key: string]: Button
  }
  /**
   * 自定义面包屑
   */
  breadcrumbs?: Breadcrumb[]
  /**
   * 是否缓存
   */
  cache?: boolean
  /**
   * 路由启用props特性
   */
  props?: boolean
  /**
   * 父级页面路由名称
   */
  parent?: string
  /**
   * 关联组件
   */
  component: Component
}
