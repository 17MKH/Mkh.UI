/** 解析页面 */
const fs = require('fs')
const path = require('path')
const os = require('os')
import { normalizePath } from 'vite'
import { IMPORT_PAGE_PREFIX } from './utils/constants'

export default function (ctx) {
  return {
    name: 'mkh-load-page',
    resolveId(id) {
      if (id.includes(IMPORT_PAGE_PREFIX)) {
        return id
      }

      return null
    },
    load(id) {
      if (id.includes(IMPORT_PAGE_PREFIX)) {
        id = id.replace(IMPORT_PAGE_PREFIX, 'page.json')
        let filePath = id
        if (ctx.isLib) {
          filePath = normalizePath(id)
        } else if (id.startsWith('/')) {
          filePath = normalizePath(path.resolve('.' + id))
        }
        let src = `import component from '${path.dirname(filePath)}/index.vue'${os.EOL}`
        src += 'const page = '
        //读取代码
        src += fs.readFileSync(filePath, 'utf-8')
        src += os.EOL

        //绑定组件
        src += `page.component = component${os.EOL}`

        //给组件设置name属性，否则keep-alive无法生效
        src += `component.name = page.name${os.EOL}`

        //导出页面
        src += 'export default page'
        return src
      }
      return null
    },
  }
}
