const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'

export default function (modules, pkg) {
  const filter = '$mkh-locale'
  return {
    name: 'mkh-load-locale',
    resolveId(id) {
      if (id.startsWith(filter)) {
        return id
      }

      return null
    },
    load(id) {
      if (id.startsWith(filter)) {
        let code = ''
        const lang = id.split('/')[1]

        /** 导入Element Plus的语言包 */
        code += `import el from 'element-plus/es/locale/lang/${lang}'\r\n`

        /** 导入Mkh中的语言包 */
        if (pkg.name === 'mkh-ui') {
          code += `import ui from '../package/locale/lang/${lang}'\r\n`
        } else {
          code += `import ui from 'mkh-ui/lib/locale/${lang}'\r\n`
        }

        /** 导入依赖模块中的语言包 */
        let mods = []
        for (let m in modules) {
          const src = normalizePath(path.resolve(modules[m], `lib/locale/${lang}`))
          if (fs.existsSync(src)) {
            code += `import ${m} from '${src}'\r\n`
            mods.push(m)
          }
        }

        /** 导入当前模块中的语言包 */

        code += `mkh.localeMessages.push({el:el.el, ui, mod: {${mods.join(',')}}})`

        return code
      }

      return null
    },
  }
}
