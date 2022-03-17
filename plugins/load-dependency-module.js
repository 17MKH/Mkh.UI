/** 解析依赖模块 */

export default function ({ modules }) {
  return {
    name: 'mkh-load-dependency-module',
    enforce: 'pre',
    load(id) {
      if (/\/mkh-mod-[^\.]+.js/.test(id)) {
        var moduleCode = /\/mkh-mod-[^\.]+/.exec(id)[0].replace('mkh-mod-', '')
        if (!modules.includes(moduleCode)) modules.push(moduleCode)
      }
      return null
    },
  }
}
