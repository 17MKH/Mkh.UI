const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'

export default function (modules) {
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
        code += `import el from 'element-plus/lib/locale/lang/${lang}.js'\r\n`

        /** 导入Mkh中的语言包 */
        code += `import ui from '${normalizePath(path.resolve(__dirname, `../lang/${lang}.js`))}'\r\n`

        /** 导入模块中的语言包 */
        let mods = []
        for (let m in modules) {
          const src = normalizePath(path.resolve(modules[m], `locale/${lang}.js`))
          if (fs.existsSync(src)) {
            code += `import ${m} from '${src}'\r\n`
            mods.push(m)
          }
        }
        code += `mkh.localeMessages.push({el:el.el, ui, mod: {${mods.join(',')}}})`

        return code
      }

      return null
    },
  }
}
