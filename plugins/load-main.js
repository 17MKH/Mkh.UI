import os from 'os'
import { IMPORT_LOCALE_PREFIX, MODULE_PREFIX, SKIN_PREFIX } from './utils/constants'
export default function (ctx) {
  return {
    name: 'mkh-load-main',
    transform(code, id) {
      if (id.endsWith('main.js')) {
        const { locales, dependencyModules, skins } = ctx
        var lines = code.split(os.EOL)
        for (let i = 0; i < lines.length; i++) {
          if (!lines[i].startsWith('import') && !lines[i].startsWith('/*')) {
            //导入语言包
            if (locales) {
              locales.forEach((m, t) => {
                lines.splice(i + t + 1, 0, `import '${IMPORT_LOCALE_PREFIX}/${m}'`)
              })
            }

            //导入依赖模块
            if (dependencyModules) {
              dependencyModules.forEach((m, t) => {
                lines.splice(i + t + 1, 0, `import '${MODULE_PREFIX}${m}'`)
              })
            }

            //导入依赖皮肤
            if (skins) {
              skins.forEach((m, t) => {
                lines.splice(i + t + 1, 0, `import '${SKIN_PREFIX}${m}'`)
              })
            }
            break
          }
        }

        return lines.join(os.EOL)
      }

      return null
    },
  }
}
