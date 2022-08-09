import type { MkhMenu } from './menu'

/** 账户信息 */
export interface Profile {
  /** 账户编号 */
  accountId: string
  /** 用户名 */
  username: string
  /** 昵称 */
  nickname: string
  /** 头像 */
  avatar: string
  /** 菜单列表 */
  menus: Array<MkhMenu>
  /** 权限列表 */
  permissions: Array<string>
  /** 账户详细信息，用于开发者自定义扩展 */
  details: any
  /** 路由菜单列表 */
  routeMenus: Array<MkhMenu>
  /** 按钮编码列表，说明：此处的按钮编码由菜单编号_按钮唯一编码组成 */
  buttons: Array<string>
  /** 皮肤 */
  skin: {
    /** 皮肤名称 */
    name: string
    /** 皮肤编码 */
    code: string
    /** 皮肤主题 */
    theme: string
    /** 皮肤尺寸 */
    size: string
  }
}
