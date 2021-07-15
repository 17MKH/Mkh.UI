const path = require('path')
const fse = require('fs-extra')
import htmlTransform from './html-transform.js'
import loadModule from './load-module.js'
import loadLocale from './load-locale.js'

export default function (options) {
  //复制index.html
  if (options && options.htmlTransform && options.htmlTransform.custom) {
    fse.copy(options.htmlTransform.custom, path.resolve('index.html'))
  }

  //模块列表
  const modules = []
  return [htmlTransform(options.htmlTransform), loadModule(modules), loadLocale(modules)]
}
