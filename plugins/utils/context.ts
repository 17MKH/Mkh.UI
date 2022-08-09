/** 打包模块 */
import type { PluginContextOptions, PluginContext } from '../plugins-types'
import path from 'path'
import fse from 'fs-extra'
import { MODULE_PREFIX } from './constants'

//打包上下文
export default function (options: PluginContextOptions): PluginContext {
  const pkg = fse.readJSONSync(path.resolve('./package.json'))

  const ctx: PluginContext = {
    pkg,
    options,
    isUI: options.isUI || false,
    isMod: options.isMod || false,
    isSkin: options.isSkin || false,
    isLib: options.target !== 'app',
    /** 入口模块 */
    entryModule: '',
    dependencyModules: options.dependencyModules || [],
    skins: options.skins,
    locales: options.locales || ['zh-cn'],
  }

  if (ctx.isMod) {
    ctx.entryModule = pkg.name.replace(MODULE_PREFIX, '')
  } else if (ctx.isUI) {
    ctx.entryModule = 'doc'
  }

  return ctx
}
