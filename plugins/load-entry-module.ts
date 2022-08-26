/** 解析入口模块 */
import type { PluginContext } from './plugins-types'
import type { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import os from 'os'
import fg from 'fast-glob'
import { normalizePath } from 'vite'
import { IMPORT_MODULE_PREFIX } from './utils/constants'

export default function (ctx: PluginContext) {
  //**匹配需要搜索的文件 */
  async function getFiles(patterns: string | string[]) {
    const files = await fg(patterns, {
      dot: true,
      caseSensitiveMatch: false,
    })
    files.sort()
    return files
  }

  //加载路由页面信息
  const loadPages = async (dir: string, pages: string[]) => {
    let files = await getFiles([dir + '/**/page.ts'])
    files.forEach((file) => {
      pages.push(normalizePath(file))
    })
  }

  //加载模块全局组件信息
  const loadComponents = async (dir: string, components: { name: string; path: string }[]) => {
    if (fs.existsSync(dir)) {
      let files = await getFiles([dir + '/**/index.vue'])
      files.forEach((file) => {
        components.push({
          name: path.basename(path.dirname(file)),
          path: normalizePath(file),
        })
      })
    }
  }

  //加载模块
  const loadModule = async () => {
    let src = '' //源码

    const { pkg, entryModule } = ctx
    let modSrc = `id:${pkg.id}, code:'${entryModule}', version:'${pkg.version}', label:'${pkg.label}', icon:'${pkg.icon}', description:'${pkg.description}'`

    /** 加载模块路由页面 */
    const pages: string[] = []
    const pagesDir = normalizePath(path.resolve('./src/views'))
    await loadPages(pagesDir, pages)

    pages.forEach((p, i) => {
      const name = `page_${i}`
      //这里将page.json替换成@page-模块编码，方便后续处理
      src += `import ${name} from '${p}'${os.EOL}`
    })

    /** 加载模块全局组件 */
    const components: { name: string; path: string }[] = []
    const componentsDir = normalizePath(path.resolve('./src/components'))
    await loadComponents(componentsDir, components)
    components.forEach((c, i) => {
      const name = `component_${i}`
      src += `import ${name} from '${c.path}'${os.EOL}`
    })

    src += `const pages = []${os.EOL}`
    pages.forEach((p, i) => {
      const name = `page_${i}`
      src += `pages.push(${name})${os.EOL}`
    })

    src += `const components = []${os.EOL}`
    components.forEach((c, i) => {
      const name = `component_${i}`
      src += `components.push({name:\'${c.name}\',component:${name}})${os.EOL}`
    })

    src += `const mod = {${modSrc}, pages, components }${os.EOL}`

    //导出模块
    src += 'export default mod'

    return src
  }

  const plugin: Plugin = {
    name: 'mkh-load-entry-module',
    enforce: 'pre',
    resolveId(id) {
      //匹配$mkh-mod并从package.json文件中获取模块编码，然后附加到id后面
      if (id.startsWith(IMPORT_MODULE_PREFIX)) {
        return id
      }

      return null
    },
    load(id) {
      if (id.startsWith(IMPORT_MODULE_PREFIX)) {
        return loadModule()
      }
      return null
    },
  }

  return plugin
}
