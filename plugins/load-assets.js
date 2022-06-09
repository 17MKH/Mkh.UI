const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
import { MODULE_PREFIX, SKIN_PREFIX } from './utils/constants'
const outputRoot = path.resolve('public/assets')

/**
 * 复制mkh-ui中的资源目录
 * 如果是mkh-ui项目本身，则从package目录中复制，如果是模块，则从node_modules目录中复制
 */
const copyUIAssets = ctx => {
  const sourceDir = path.resolve(ctx.isUI ? 'package/assets' : 'node_modules/mkh-ui/lib/assets')
  fse.copy(sourceDir, path.resolve(outputRoot, 'mkh'))
}

/**
 * 复制皮肤中的资源
 */
const copySkinAssets = skins => {
  fse.readdir(path.resolve('node_modules'), (err, dirs) => {
    dirs.forEach(m => {
      if (m.startsWith(SKIN_PREFIX) && skins.includes(m.replace(SKIN_PREFIX, ''))) {
        const assetsPath = path.resolve(`node_modules/${m}/lib/assets`)
        fse.pathExists(assetsPath, (err, exists) => {
          if (exists) {
            fse.copy(assetsPath, path.resolve(outputRoot, 'skins', m.replace(SKIN_PREFIX, '')))
          }
        })
      }
    })
  })
}

/**
 * 复制依赖模块中的资源
 */
const copyDependencyModuleAssets = ctx => {
  fse.readdir(path.resolve('node_modules'), (err, dirs) => {
    dirs.forEach(m => {
      if (m.startsWith(MODULE_PREFIX) && ctx.dependencyModules.includes(m.replace(MODULE_PREFIX, ''))) {
        const assetsPath = path.resolve(`node_modules/${m}/lib/assets`)
        fse.pathExists(assetsPath, (err, exists) => {
          if (exists) {
            fse.copy(assetsPath, path.resolve(outputRoot, 'mods', m.replace(MODULE_PREFIX, '')))
          }
        })
      }
    })
  })
}

/**
 * 复制入口模块中的资源
 */
const copyEntryModuleAssets = ctx => {
  if (!ctx.isUI) {
    const assetsPath = path.resolve('src/assets')
    fse.pathExists(assetsPath, (err, exists) => {
      if (exists) {
        fse.copy(assetsPath, path.resolve(outputRoot, 'mods', ctx.entryModule))
      }
    })
  }
}

export default function (ctx) {
  return {
    name: 'mkh-load-assets',
    enforce: 'post',
    buildStart() {
      if (ctx.isLib || ctx.isSkin) return

      copyUIAssets(ctx)

      copySkinAssets(ctx.skins)

      copyEntryModuleAssets(ctx)

      copyDependencyModuleAssets(ctx)
    },
    writeBundle(bundle) {
      if (ctx.isLib) {
        //如果是库模式，需要在打包结束后复制资源目录到输出目录
        let output = path.resolve('lib/assets')
        if (ctx.isUI) {
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
        let styleFilePath = path.resolve(bundle.dir, 'style.css')
        fse.pathExists(styleFilePath, (err, exists) => {
          if (exists) {
            let entryFilePath = path.resolve(bundle.dir, bundle.entryFileNames)
            fs.appendFile(entryFilePath, "import './style.css';", () => {})
          }
        })
      }
    },
  }
}
