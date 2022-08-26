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
    entryModule: '',
    isLib: options.target === 'lib',
  }

  if (options.isMod) {
    ctx.entryModule = pkg.name.replace(MODULE_PREFIX, '')
  } else if (options.isUI) {
    ctx.entryModule = 'doc'
  }

  return ctx
}
