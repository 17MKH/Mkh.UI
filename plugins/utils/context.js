/** 打包模块 */
const path = require('path')
const fse = require('fs-extra')
import { UI_NAME } from './constants'

//打包上下文
export default function (mode) {
  const pkg = fse.readJSONSync(path.resolve('./package.json'))

  return {
    pkg,
    //当前执行应用是否是UI
    isUI: pkg.name === UI_NAME,
    //打包模式是否是库模式
    isLib: mode === 'lib',
    //入口模块
    entryModule: null,
    //依赖模块列表
    dependencyModules: [],
    //皮肤列表
    skins: [],
  }
}
