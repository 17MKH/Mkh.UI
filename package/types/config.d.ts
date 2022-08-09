/** 17MKH配置相关类型 */
import { RouteLocationRaw } from 'vue-router'
import { MkhMenu } from './menu'
import { ApiAction } from './mkh'
import { Profile } from './profile'

/** 站点标题 */
type SiteTitle =
  | string
  | {
      /** 中文标题 */
      'zh-cn': string
      /** 英文标题 */
      en: string
    }

/** 自定义获取菜单函数 */
declare type CustomMenusFunction = (profile: Profile) => Array<MkhMenu>

/** 自定义菜单 */
declare type CustomMenus = CustomMenusFunction | Array<MkhMenu>

/** 站点配置 */
interface SiteConfig {
  /** 系统标题 */
  title: SiteTitle
  /** 系统Logo */
  logo: string
  /** 自定义首页地址 */
  home: string | RouteLocationRaw
  /** 自定义账户中心页面*/
  profile: RouteLocationRaw
  /** 自定义菜单， */
  menus?: CustomMenus
}

/** 认证和授权配置 */
interface AuthConfig {
  /**启用按钮权限 */
  enableButtonPermissions: boolean
  /**启用验证码功能 */
  enableVerifyCode: boolean
}

/** 组件配置 */
interface ComponentConfig {
  /**加载动画 */
  loading: {
    /** 加载动画配景色 */
    background: string
    /** 加载动画图标 */
    spinner: string
  }
  /**登录组件名称，不包含m-login-前缀，默认为m */
  login: string
  /**对话框组件 */
  dialog: {
    /**默认是否可拖拽 */
    draggable: boolean
  }
  /**列表组件 */
  list: {
    /**格式化方法集合 */
    formatters
  }
}

/**系统操作，供系统内部使用，用户需要通过替换默认操作方法来实现自定义功能 */
interface SystemActionsConfig {
  /**登录方法 */
  login: ApiAction
  /**刷新令牌 */
  refreshToken: ApiAction
  /**获取验证码方法 */
  getVerifyCode: ApiAction
  /**获取账户信息 */
  getProfile?: ApiAction
  /**切换皮肤 */
  toggleSkin: ApiAction
}

/** 默认皮肤配置 */
interface SkinConfig {
  /** 皮肤名称 */
  name: string
  /** 皮肤编码 */
  code: string
  /** 主题 */
  theme: string
  /** 尺寸 */
  size: string
}

/** 配置信息 */
interface IConfig {
  /** 站点配置 */
  site: Partial<SiteConfig>
  /** 认证和授权配置 */
  auth: Partial<AuthConfig>
  /** 组件配置 */
  component: Partial<ComponentConfig>
  /** 系统操作，供系统内部使用，用户需要通过替换默认操作方法来实现自定义功能 */
  systemActions: SystemActionsConfig
  /** 默认皮肤配置 */
  skin?: SkinConfig
}

export interface Config extends IConfig {}
