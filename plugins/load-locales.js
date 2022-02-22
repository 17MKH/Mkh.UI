const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'
import { UI_NAME, MODULE_PREFIX, IMPORT_LOCALE_PREFIX, SKIN_PREFIX } from './utils/constants'

export default function (ctx) {
  return {
    name: 'mkh-load-locales',
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
        code += `import el from 'element-plus/es/locale/lang/${lang}'\r\n`

        if (ctx.isUI) {
          code += `import ui from '../package/locales/lang/${lang}'\r\n`
          /** 导入文档模块中的语言包 */
          const src = normalizePath(path.resolve(process.cwd(), `src/locales/${lang}.js`))
          if (fs.existsSync()) {
            code += `import doc from '${src}'\r\n`
            mods.push('doc')
          }
        } else {
          /** 导入Mkh中的语言包 */
          code += `import ui from '${UI_NAME}/lib/locales/${lang}'\r\n`

          /** 导入当前模块中的语言包 */
          const src = normalizePath(path.resolve(process.cwd(), `src/locales/${lang}.js`))
          if (fs.existsSync(src)) {
            code += `import ${ctx.entryModule} from '${src}'\r\n`
            mods.push(ctx.entryModule)
          }

          /** 导入依赖模块中的语言包 */
          ctx.dependencyModules.forEach(m => {
            let moduleName = `${MODULE_PREFIX}${m}`
            const src = normalizePath(path.resolve(process.cwd(), `node_modules/${moduleName}/lib/locales/${lang}.js`))
            if (fs.existsSync(src)) {
              let moduleImportName = moduleName.replaceAll('-', '_')
              code += `import ${moduleImportName} from '${src}'\r\n`
              mods.push(moduleImportName)
            }
          })

          /** 导入皮肤中的语言包 */
          ctx.skins.forEach(skin => {
            let skinName = `${SKIN_PREFIX}${skin}`
            const src = normalizePath(path.resolve(process.cwd(), `node_modules/${skinName}/lib/locales/${lang}.js`))
            if (fs.existsSync(src)) {
              let skinImportName = skinName.replaceAll('-', '_')
              code += `import ${skinImportName} from '${skinName}/lib/locale/${lang}'\r\n`
              skinList += `${skin.replace(SKIN_PREFIX, '')}: ${skinImportName}`
            }
          })
        }

        code += `mkh.localeMessages.push({el:el.el, ui, mod: {${mods.join(',')}}, skin: {${skinList}}})`

        return code
      }

      return null
    },
  }
}
