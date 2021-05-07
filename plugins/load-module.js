const fs = require('fs')
const path = require('path')
import fg from 'fast-glob'
import { normalizePath } from 'vite'

export default function (modules) {
  const prefix = '@mkh-module-'

  //**匹配需要搜索的文件 */
  async function getFiles(patterns) {
    const files = await fg(patterns, {
      dot: true,
      caseSensitiveMatch: false,
    })
    files.sort()
    return files
  }

  //加载路由页面信息
  const loadPages = async (dir, pages) => {
    let files = await getFiles([dir + '/**/page.js'])
    files.forEach(file => {
      pages.push(normalizePath(file))
    })
  }

  //加载模块全局组件信息
  const loadComponents = async (dir, components) => {
    if (fs.existsSync(dir)) {
      let files = await getFiles([dir + '/**/index.vue'])
      files.forEach(file => {
        components.push({
          name: path.basename(path.dirname(file)),
          path: normalizePath(file),
        })
      })
    }
  }

  return {
    name: 'mkh-load-module',
    resolveId(id, importer) {
      //匹配@mkh-module并从package.json文件中获取模块编码，然后附加到id后面
      if (id.startsWith(prefix)) {
        const code = id.replace(prefix, '')
        if (importer.indexOf('index.html') > 0) {
          modules[code] = path.resolve(path.dirname(normalizePath(importer)), 'src')
        } else {
          modules[code] = path.dirname(normalizePath(importer))
        }
        return id
      }

      return null
    },
    async load(id) {
      if (id.startsWith(prefix)) {
        let src = '' //导入代码
        let exportCode = '' //导出代码
        const code = id.replace(prefix, '')
        const dir = modules[code]

        /** 加载package.json */
        const packageFile = normalizePath(path.resolve(dir, '../package.json'))
        const hasPackageFile = fs.existsSync(packageFile)
        if (hasPackageFile) {
          src += `import { id, version, description } from '${packageFile}'\r\n`
          exportCode += `id:id || 0, code:'${code}', version, description`
        }

        /** 加载接口服务api */
        const apiDir = normalizePath(path.resolve(dir, 'api/index.js'))
        if (fs.existsSync(apiDir)) {
          src += `import api from '${apiDir}'\r\n`
          exportCode += ',api'
        }

        /** 加载状态 */
        const storeDir = normalizePath(path.resolve(dir, 'store/index.js'))
        if (fs.existsSync(storeDir)) {
          src += `import store from '${storeDir}'\r\n`
          exportCode += ',store'
        }

        /** 加载模块路由页面 */
        const pages = []
        const pagesDir = normalizePath(path.resolve(dir, 'views'))
        await loadPages(pagesDir, pages)

        pages.forEach((p, i) => {
          const name = `page_${i}`
          src += `import ${name} from '${p}'\r\n`
        })

        /** 加载模块全局组件 */
        const components = []
        const componentsDir = normalizePath(path.resolve(dir, 'components'))
        await loadComponents(componentsDir, components)
        components.forEach((c, i) => {
          const name = `component_${i}`
          src += `import ${name} from '${c.path}'\r\n`
        })

        src += 'const pages = []\r\n'
        src += 'const components = []\r\n'
        pages.forEach((p, i) => {
          const name = `page_${i}`
          src += `pages.push(${name})\r\n`
        })
        components.forEach((c, i) => {
          const name = `component_${i}`
          src += `components.push({name:\'${c.name}\',component:${name}})\r\n`
        })

        src += `const mod = {${exportCode}, pages, components }\r\n`
        //注册模块
        src += 'MkhUI.useModule(mod);\r\n'
        //导出模块
        src += 'export default mod'
        return src
      }

      return null
    },
  }
}
