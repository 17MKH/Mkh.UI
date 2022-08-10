import { Skin } from './skin'

/**
 * 登录模型
 */
export interface LoginDto {
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
}

/**
 * Jwt凭证模型
 */
export interface JwtCredential {
  /**
   * 账户编号
   */
  accountId: string
  /**
   * 访问令牌
   */
  accessToken: string
  /**
   * 刷新令牌
   */
  refreshToken: string
  /**
   * 过期时间
   */
  expiresIn: number
  /**
   * 登录时间
   */
  loginTime: number
}

/**
 * 账户信息
 */
export interface Profile {
  /**
   * 账户编号
   */
  accountId: string
  /**
   * 用户名
   */
  username: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 菜单列表
   */
  menus: Array<Menu>
  /**
   * 权限列表
   */
  permissions: Array<string>
  /**
   * 账户详细信息，用于开发者自定义扩展
   */
  details?: any
  /**
   * 路由菜单列表
   */
  routeMenus: Array<Menu>
  /**
   * 按钮编码列表，说明：此处的按钮编码由菜单编号_按钮唯一编码组成
   */
  buttons: Array<string>
  /**
   * 皮肤
   */
  skin: Skin
}

/**
 * 验证码
 */
export interface VerifyCode {
  /**
   * 编号
   */
  id: string
  /**
   * 图片的Base64字符串
   */
  base64: string
}

/**
 * 更新皮肤模型
 */
export interface UpdateSkinDto extends Skin {}
