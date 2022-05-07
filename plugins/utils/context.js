/** 打包模块 */
const path = require('path')
const fse = require('fs-extra')
import { UI_NAME, MODULE_PREFIX, SKIN_PREFIX } from './constants'

//打包上下文
export default function (options) {
  const pkg = fse.readJSONSync(path.resolve('./package.json'))

  const ctx = {
    pkg,
    options,
    /** 当前执行应用是否是UI */
    isUI: pkg.name === UI_NAME,
    /** 当前执行应用是否是业务模块 */
    isMod: pkg.name.startsWith(MODULE_PREFIX),
    /** 当前执行应用是否是皮肤 */
    isSkin: pkg.name.startsWith(SKIN_PREFIX),
    /** 打包模式是否是库模式 */
    isLib: options.target === 'lib',
    /** 入口模块 */
    entryModule: null,
    /** 依赖模块列表 */
    dependencyModules: options.dependencyModules || [],
    /** 皮肤列表 */
    skins: options.skins,
    /** 语言包 */
    locales: options.locales || ['zh-cn'],
  }

  if (ctx.isMod) {
    ctx.entryModule = pkg.name.replace(MODULE_PREFIX, '')
  } else if (ctx.isUI) {
    ctx.entryModule = 'doc'
  }

  return ctx
}
