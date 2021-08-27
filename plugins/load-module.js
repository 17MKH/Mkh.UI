const fs = require('fs')
const path = require('path')
import fg from 'fast-glob'
import { normalizePath } from 'vite'

export default function (modules) {
  const prefix = '@mkh-mod-'
  const prefixPage = '@page-'

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
    let files = await getFiles([dir + '/**/page.json'])
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

  //加载API
  const loadApi = async (dir, api) => {
    let files = await getFiles([dir + '/*.js'])
    files.forEach(file => {
      api.push({
        name: path.basename(path.basename(file)).replace('.js', ''),
        path: normalizePath(file),
      })
    })
  }

  //加载模块
  const loadModule = async id => {
    let src = '' //导入代码
    let exportCode = '' //导出代码
    const code = id.replace(prefix, '')
    const dir = path.resolve(modules[code], 'src')
    /** 加载package.json */
    const packageFile = normalizePath(path.resolve(dir, '../package.json'))
    const hasPackageFile = fs.existsSync(packageFile)
    if (hasPackageFile) {
      src += `import { id, version, label, icon, description } from '${packageFile}'\r\n`
      exportCode += `id:id || 0, code:'${code}', version, label, icon, description`
    }

    /** 加载接口服务api */
    const api = []
    const apiDir = normalizePath(path.resolve(dir, 'api'))
    await loadApi(apiDir, api)
    api.forEach(a => {
      src += `import api_${a.name} from '${a.path}'\r\n`
    })

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
      //这里将page.json替换成@page-模块编码，方便后续处理
      src += `import ${name} from '${p.replace('page.json', prefixPage + code)}'\r\n`
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
    pages.forEach((p, i) => {
      const name = `page_${i}`
      src += `pages.push(${name})\r\n`
    })

    src += 'const components = []\r\n'
    components.forEach((c, i) => {
      const name = `component_${i}`
      src += `components.push({name:\'${c.name}\',component:${name}})\r\n`
    })

    src += 'const api = {}\r\n'
    api.forEach(a => {
      src += `api['${a.name}'] = api_${a.name}\r\n`
    })

    src += `const mod = {${exportCode}, pages, components, api }\r\n`
    //注册模块
    src += 'mkh.useModule(mod);\r\n'
    //导出模块
    src += 'export default mod'
    return src
  }

  //加载单个页面
  const loadPage = id => {
    let code = id.split('-').pop()
    let moduleDir = modules[code]
    let filePath = ''
    if (id.startsWith('/')) filePath = normalizePath(moduleDir + id.replace(prefixPage + code, 'page.json'))
    else {
      filePath = normalizePath(id.replace(prefixPage + code, 'page.json'))
    }

    let src = `import component from '${path.dirname(filePath)}/index.vue'\r\n`
    src += 'const page = '
    //读取代码
    src += fs.readFileSync(filePath, 'utf-8')
    src += '\r\n'

    //绑定组件
    src += 'page.component = component\r\n'

    //给组件设置name属性，否则keep-alive无法生效
    src += 'component.name = page.name\r\n'

    //导出页面
    src += 'export default page'

    return src
  }

  return {
    name: 'mkh-load-module',
    resolveId(id, importer) {
      //匹配@mkh-mod并从package.json文件中获取模块编码，然后附加到id后面
      if (id.startsWith(prefix)) {
        const code = id.replace(prefix, '')
        if (!modules[code]) {
          if (importer.indexOf('index.html') > 0) {
            modules[code] = path.resolve(path.dirname(normalizePath(importer)))
          } else {
            modules[code] = path.resolve(path.dirname(importer), '../')
          }
        }
        return id
      } else if (id.includes(prefixPage)) {
        return id
      }

      return null
    },
    async load(id) {
      if (id.startsWith(prefix)) {
        return loadModule(id)
      } else if (id.includes(prefixPage)) {
        return loadPage(id)
      }
      return null
    },
  }
}
