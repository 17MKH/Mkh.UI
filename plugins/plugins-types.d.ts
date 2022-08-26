export interface HtmlTransform {
  /** 模板渲染数据，如果使用自己的模板，则自己定义渲染数据 */
  render?: {}
  /** 压缩配置 */
  minify?: {}
}

/**
 * 插件上下文配置项
 */
export interface PluginContextOptions {
  /** 模式 */
  mode: string
  /** 命令 */
  command: string
  /** 当前执行应用是否是UI */
  isUI?: boolean
  /** 当前执行应用是否是业务模块 */
  isMod?: boolean
  /** 当前执行应用是否是皮肤 */
  isSkin?: boolean
  /** 打包模式是否是库模式 */
  target: 'app' | 'lib'
  /** index.html转换配置 */
  htmlTransform?: HtmlTransform
}

/**
 * 插件上下文
 */
export interface PluginContext {
  /**
   * 包信息
   */
  pkg: {
    /** 编号 */
    id: number
    /** 版本号 */
    version: string
    /** 名称 */
    label: string
    /** 图标 */
    icon: string
    /** 说明 */
    description: string
  }
  /**
   * 配置项
   */
  options: PluginContextOptions
  /**
   * 入口模块
   */
  entryModule: string
  /**
   * 是否是库模式
   */
  isLib: boolean
}
