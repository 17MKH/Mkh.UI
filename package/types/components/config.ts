/** 17MKH配置相关类型 */
import { RouteLocationRaw } from 'vue-router'
import { Menu } from './menu'
import { LoginDto, JwtCredential, Profile, VerifyCode, UpdateSkinDto, RefreshTokenDto } from './auth'
import { Skin } from './skin'
import { FormatterFunction } from './list'

/**
 * 站点配置
 */
interface SiteConfig {
  /**
   * 系统标题
   */
  title:
    | {
        /**
         * 中文标题
         */
        'zh-cn': string
        /**
         * 英文标题
         */
        en: string
        [key: string]: string
      }
    | string
  /**
   * 系统Logo
   */
  logo: string
  /**
   * 首页页面
   */
  homePage: string | RouteLocationRaw
  /**
   * 账户中心页面
   */
  profilePage: string | RouteLocationRaw
  /**
   * 自定义菜单
   */
  menus?:
    | {
        (profile: Profile): Array<Menu>
      }
    | Array<Menu>
}

/**
 * 认证和授权配置
 */
interface AuthConfig {
  /**
   * 启用按钮权限
   */
  enableButtonPermissions: boolean
  /**
   * 启用验证码功能
   */
  enableVerifyCode: boolean
}

/**
 * 组件配置
 */
interface ComponentConfig {
  /**
   * 加载动画
   */
  loading: {
    /**
     * 加载动画配景色
     */
    background: string
    /**
     * 加载动画图标
     */
    spinner: string
  }
  /**
   * 登录组件名称，不包含m-login-前缀，默认为m
   */
  login: string
  /**
   * 对话框组件
   */
  dialog: {
    /**
     * 默认是否可拖拽
     */
    draggable: boolean
  }
  /**
   * 列表组件
   */
  list: {
    /**
     * 格式化方法集合
     */
    formatters: Map<string, FormatterFunction>
  }
}

/**
 * 系统操作
 *
 * @remarks
 *
 * 供系统内部使用，用户需要通过替换默认操作方法来实现自定义功能
 */
interface SystemActionsConfig {
  /**
   * 登录方法
   * @param dto 登录对象
   */
  login(dto: LoginDto): Promise<JwtCredential>
  /**
   * 刷新令牌
   */
  refreshToken?(dto: RefreshTokenDto): Promise<JwtCredential>
  /**
   * 获取登录验证码
   */
  getVerifyCode(): Promise<VerifyCode>
  /**
   * 获取账户信息
   */
  getProfile(): Promise<Profile>
  /**
   * 切换皮肤
   * @param skin 皮肤更新对象
   */
  toggleSkin(skin: UpdateSkinDto): Promise<void>
}

/**
 * 配置信息
 */
export interface Config {
  /**
   * 站点配置
   */
  site: SiteConfig
  /**
   * 认证和授权配置
   */
  auth: AuthConfig
  /**
   * 组件配置
   */
  component: ComponentConfig
  /**
   * 系统操作
   *
   * @remarks
   *
   * 供系统内部使用，用户需要通过替换默认操作方法来实现自定义功能
   */
  systemActions: SystemActionsConfig
  /**
   * 皮肤配置
   */
  skin: Skin
}
