const path = require('path')
const fse = require('fs-extra')
import htmlTransform from './html-transform'
import loadModule from './load-module'
import loadLocale from './load-locale'
import loadAssets from './load-assets'
import loadSkin from './load-skin'

export default function (options) {
  const pkg = fse.readJSONSync(path.resolve('./package.json'))
  //模块列表
  const modules = []
  //皮肤列表
  const skins = []
  return [htmlTransform(options.htmlTransform || {}), loadModule(modules), loadSkin(skins), loadLocale(modules, skins, pkg), loadAssets(options, pkg)]
}
