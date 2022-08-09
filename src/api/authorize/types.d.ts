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
 * 登录视图模型
 */
export interface LoginVo {
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
  loginTime: string
}

/**
 * 验证码视图模型
 */
export interface VerifyCodeVo {
  id: string
  base64: string
}

/**
 * 更新皮肤模型
 */
export interface UpdateSkinDto {}
