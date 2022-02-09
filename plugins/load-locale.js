const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'

export default function (modules, skins, pkg) {
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
        let mods = []

        const lang = id.split('/')[1]

        /** 导入Element Plus的语言包 */
        code += `import el from 'element-plus/es/locale/lang/${lang}'\r\n`

        if (pkg.name === 'mkh-ui') {
          code += `import ui from '../package/locale/lang/${lang}'\r\n`
          /** 导入文档模块中的语言包 */
          const src = normalizePath(path.resolve(process.cwd(), `src/locale/${lang}.js`))
          console.log(src)
          if (fs.existsSync(src)) {
            code += `import doc from '${src}'\r\n`
            mods.push('doc')
          }
        } else {
          /** 导入Mkh中的语言包 */
          code += `import ui from 'mkh-ui/lib/locale/${lang}'\r\n`

          /** 导入当前模块中的语言包 */
          if (pkg.name.startsWith('mkh-mod-')) {
            const currModCode = pkg.name.replace('mkh-mod-', '')
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

        return code
      }

      return null
    },
  }
}
