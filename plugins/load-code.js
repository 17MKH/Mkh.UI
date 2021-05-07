const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'
import { createFilter } from '@rollup/pluginutils'

/** 加载示例代码 */
export default function () {
  //匹配示例文件
  const suffix = '.code'
  const filter = createFilter(/^!.*$/)
  const filterLoad = createFilter(/^.*.code$/)

  return {
    name: 'mkh-load-code',
    resolveId(id, importer) {
      if (filter(id)) {
        //移除目录中的!符号并添加.code后缀
        id = id.replace('!', '') + suffix
        if (id.startsWith('/')) {
          return id
        }
        return path.resolve(path.dirname(importer), id)
      }
      return null
    },
    load(id) {
      if (filterLoad(id)) {
        let filePath = id.replace(suffix, '')
        if (filePath.startsWith('/')) {
          //开发环境下，文件路径是url形式的，所以需要转换一下
          filePath = normalizePath(__dirname.replace('plugins', '') + filePath)
        }

        //先将后缀名修改为vue在读取文件内容
        const data = fs.readFileSync(filePath, 'utf8')
        return `export default \`${data}\``
      }

      return null
    },
  }
}
