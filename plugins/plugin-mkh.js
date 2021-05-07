import htmlTransform from './html-transform.js'
import loadModule from './load-module.js'
import loadLocale from './load-locale.js'

export default function (options) {
  //模块列表
  const modules = []
  return [htmlTransform(options.htmlTransform), loadModule(modules), loadLocale(modules)]
}
