const fs = require('fs')
const path = require('path')
const os = require('os')
import { normalizePath } from 'vite'
import { UI_NAME, MODULE_PREFIX, IMPORT_LOCALE_PREFIX, SKIN_PREFIX } from './utils/constants'

export default function (ctx) {
  return {
    name: 'mkh-load-locales',
    enforce: 'post',
    resolveId(id) {
      if (id.startsWith(IMPORT_LOCALE_PREFIX)) {
        return id
      }

      return null
    },
    load(id) {
      if (ctx.isLib) return null

      if (id.startsWith(IMPORT_LOCALE_PREFIX)) {
        let code = ''
        let mods = []
        let skinList = ''

        const lang = id.split('/')[1]

        /** 导入Element Plus的语言包 */
        code += `import el from 'element-plus/es/locale/lang/${lang}'${os.EOL}`

        if (ctx.isUI) {
          code += `import ui from '../package/locales/lang/${lang}'${os.EOL}`
          /** 导入文档模块中的语言包 */
          const src = normalizePath(path.resolve(process.cwd(), `src/locales/${lang}/index.js`))
          if (fs.existsSync(src)) {
            code += `import doc from '${src}'${os.EOL}`
            mods.push('doc')
          }
        } else {
          const { entryModule, dependencyModules, skins } = ctx

          /** 导入Mkh中的语言包 */
          code += `import ui from '${UI_NAME}/lib/locales/${lang}'${os.EOL}`

          /** 导入当前模块中的语言包 */
          const src = normalizePath(path.resolve(process.cwd(), `src/locales/${lang}/index.js`))
          if (fs.existsSync(src)) {
            code += `import ${entryModule} from '${src}'${os.EOL}`
            mods.push(entryModule)
          }
          /** 导入依赖模块中的语言包 */
          if (dependencyModules) {
            dependencyModules.forEach(m => {
              let moduleName = `${MODULE_PREFIX}${m}`
              const src = normalizePath(path.resolve(process.cwd(), `node_modules/${moduleName}/lib/locales/${lang}/index.js`))
              if (fs.existsSync(src)) {
                let moduleImportName = moduleName.replace(MODULE_PREFIX, '').replaceAll('-', '_')
                code += `import ${moduleImportName} from '${src}'${os.EOL}`
                mods.push(moduleImportName)
              }
            })
          }

          /** 导入皮肤中的语言包 */
          if (skins) {
            skins.forEach(skin => {
              let skinName = `${SKIN_PREFIX}${skin}`
              const src = normalizePath(path.resolve(process.cwd(), `node_modules/${skinName}/lib/locales/${lang}/index.js`))
              if (fs.existsSync(src)) {
                let skinImportName = skinName.replaceAll('-', '_')
                code += `import ${skinImportName} from '${skinName}/lib/locales/${lang}'${os.EOL}`
                skinList += `${skin.replace(SKIN_PREFIX, '')}: ${skinImportName}`
              }
            })
          }
        }

        code += `mkh.localeMessages.push({el:el.el, ui, mod: {${mods.join(',')}}, skin: {${skinList}}})`

        return code
      }

      return null
    },
  }
}
