import type { PluginContext } from './plugins-types'
import type { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'
import readline from 'readline'
import { MODULE_PREFIX, SKIN_PREFIX } from './utils/constants'
const outputRoot = path.resolve('public/assets')

/**
 * 复制mkh-ui中的资源目录
 * 如果是mkh-ui项目本身，则从package目录中复制，如果是模块，则从node_modules目录中复制
 */
const copyUIAssets = (ctx: PluginContext) => {
  const sourceDir = path.resolve(ctx.options.isUI ? 'package/assets' : 'node_modules/mkh-ui/lib/assets')
  fse.copy(sourceDir, path.resolve(outputRoot, 'mkh'))
}

/**
 * 复制皮肤中的资源
 */
const copySkinAssets = (ctx: PluginContext) => {
  fse.readdir(path.resolve('node_modules'), (err, dirs) => {
    dirs.forEach((m) => {
      const code = m.replace(SKIN_PREFIX, '')
      if (m.startsWith(SKIN_PREFIX) && ctx.skins.includes(code)) {
        const assetsPath = path.resolve(`node_modules/${m}/lib/assets`)
        fse.pathExists(assetsPath, (err, exists) => {
          if (exists) {
            const output = path.resolve(outputRoot, 'skins', code)
            fse.copy(assetsPath, output)
            console.log(`Copy skin ${code} assets to ${output}`)
          }
        })
      }
    })
  })
}

/**
 * 复制依赖模块中的资源
 */
const copyDependencyModuleAssets = (ctx: PluginContext) => {
  if (!ctx.options.isMod) return

  fse.readdir(path.resolve('node_modules'), (err, dirs) => {
    dirs.forEach((m) => {
      const code = m.replace(MODULE_PREFIX, '')
      if (m.startsWith(MODULE_PREFIX) && ctx.modules.includes(code)) {
        const assetsPath = path.resolve(`node_modules/${m}/lib/assets`)
        fse.pathExists(assetsPath, (err, exists) => {
          if (exists) {
            const output = path.resolve(outputRoot, 'mods', code)
            fse.copy(assetsPath, output)
            console.log(`Copy module ${code} assets to ${output}`)
          }
        })
      }
    })
  })
}

/**
 * 复制入口模块中的资源
 */
const copyEntryModuleAssets = (ctx: PluginContext) => {
  if (!ctx.options.isMod) return

  const assetsPath = path.resolve('src/assets')
  fse.pathExists(assetsPath, (err, exists) => {
    if (exists) {
      fse.copy(assetsPath, path.resolve(outputRoot, 'mods', ctx.entryModule))
    }
  })
}

export default function (ctx: PluginContext) {
  const plguin: Plugin = {
    name: 'mkh-load-assets',
    enforce: 'post',
    async buildStart() {
      if (ctx.isLib || ctx.options.isSkin) return

      const mainSrc = path.resolve('src/main.ts')

      async function processLineByLine() {
        const fileStream = fs.createReadStream(mainSrc)

        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        })

        for await (const line of rl) {
          //匹配模块
          const moduleMatch = line.match(/(.*?)import.*?from(.*?)'mkh-mod-(.*)'/)
          if (moduleMatch) {
            ctx.modules.push(moduleMatch[3])
          }

          //匹配皮肤
          const skinMatch = line.match(/(.*?)import.*?from(.*?)'mkh-skin-(.*)'/)
          if (skinMatch) {
            ctx.skins.push(skinMatch[3])
          }
        }
      }

      await processLineByLine()

      copyUIAssets(ctx)

      copySkinAssets(ctx)

      copyEntryModuleAssets(ctx)

      copyDependencyModuleAssets(ctx)
    },
    writeBundle(bundle) {
      if (ctx.isLib) {
        //如果是库模式，需要在打包结束后复制资源目录到输出目录
        let output = path.resolve('lib/assets')
        if (ctx.options.isUI) {
          fse.copy(path.resolve('package/assets'), output)
        } else {
          let assetsPath = path.resolve('src/assets')
          fse.pathExists(assetsPath, (err, exists) => {
            if (exists) {
              fse.copy(assetsPath, output)
            }
          })
        }

        //在生成的入口文件中添加导入样式文件的代码
        let styleFilePath = path.resolve(bundle.dir as string, 'style.css')
        fse.pathExists(styleFilePath, (err, exists) => {
          if (exists) {
            let entryFilePath = path.resolve(bundle.dir as string, bundle.entryFileNames as string)
            fs.appendFile(entryFilePath, "import './style.css';", () => {})
          }
        })
      }
    },
  }

  return plguin
}
