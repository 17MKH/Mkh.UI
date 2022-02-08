const path = require('path')
const fse = require('fs-extra')
import htmlTransform from './html-transform.js'
import loadModule from './load-module.js'
import loadLocale from './load-locale.js'
import loadAssets from './load-assets.js'

export default function (options) {
  const pkg = fse.readJSONSync(path.resolve('./package.json'))
  //模块列表
  const modules = []
  return [htmlTransform(options.htmlTransform || {}), loadModule(modules), loadLocale(modules, pkg), loadAssets(options, pkg)]
}
