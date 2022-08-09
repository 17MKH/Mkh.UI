import type { Config } from './config'
import type { Profile } from './profile'

/** 配置状态 */
export interface ConfigState extends Config {}

/** 账户信息状态 */
export interface ProfileState extends Profile {}

/** 账户信息方法 */
export interface ProfileActions {
  /** 初始化 */
  init(): void
  /** 清除 */
  clear(this: ProfileState): void
}

/** 令牌信息状态 */
export interface TokenState {
  /** 账户编号 */
  accountId: string
  /** 请求令牌 */
  accessToken: string
  /** 刷新令牌 */
  refreshToken: string
}

/** 令牌状态方法 */
export interface TokenActions {
  /** 从本地加载令牌 */
  load(this: TokenState): void
  /** 设置令牌 */
  set(this: TokenState, token?: TokenState): void
  /** 清理令牌 */
  clear(this: TokenState): void
}
