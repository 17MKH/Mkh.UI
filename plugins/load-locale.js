const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'
import { UI_NAME, MODULE_PREFIX, IMPORT_LOCALE_PREFIX } from './constants'

export default function (modules, skins, pkg) {
  return {
    name: 'mkh-load-locale',
    resolveId(id) {
      if (id.startsWith(IMPORT_LOCALE_PREFIX)) {
        return id
      }

      return null
    },
    load(id) {
      if (id.startsWith(IMPORT_LOCALE_PREFIX)) {
        let code = ''
        let mods = []

        const lang = id.split('/')[1]

        /** 导入Element Plus的语言包 */
        code += `import el from 'element-plus/es/locale/lang/${lang}'\r\n`

        if (pkg.name === UI_NAME) {
          code += `import ui from '../package/locale/lang/${lang}'\r\n`
          /** 导入文档模块中的语言包 */
          const src = normalizePath(path.resolve(process.cwd(), `src/locale/${lang}.js`))
          if (fs.existsSync(src)) {
            code += `import doc from '${src}'\r\n`
            mods.push('doc')
          }
        } else {
          /** 导入Mkh中的语言包 */
          code += `import ui from '${UI_NAME}/lib/locale/${lang}'\r\n`

          /** 导入当前模块中的语言包 */
          if (pkg.name.startsWith(MODULE_PREFIX)) {
            const currModCode = pkg.name.replace(MODULE_PREFIX, '')
            const src = normalizePath(path.resolve(process.cwd(), `src/locale/${lang}.js`))
            if (fs.existsSync(src)) {
              code += `import ${currModCode} from '${src}'\r\n`
              mods.push(currModCode)
            }
          }

          /** 导入依赖模块中的语言包 */
          for (let m in modules) {
            const src = normalizePath(path.resolve(modules[m], `lib/locale/${lang}.js`))
            if (fs.existsSync(src)) {
              code += `import ${m} from '${src}'\r\n`
              mods.push(m)
            }
          }

          /** 导入皮肤中的语言包 */
          for (let skin in skins) {
            const src = normalizePath(path.resolve(modules[m], `lib/locale/${lang}.js`))
            if (fs.existsSync(src)) {
              code += `import ${m} from '${skin}/lib/locale'\r\n`
              mods.push(m)
            }
          }
        }

        code += `mkh.localeMessages.push({el:el.el, ui, mod: {${mods.join(',')}}})`
        console.log(code)
        return code
      }

      return null
    },
  }
}
