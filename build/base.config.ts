import type { UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import mui from '../plugins/plugin-ui'

function replaceAll(find, replace, str) {
  var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  return str.replace(new RegExp(find, 'g'), replace)
}

export default ({ target, mode, command }): UserConfig => {
  return {
    plugins: [
      mui({
        target,
        mode,
        command,
        isUI: true,
        /** index.html文件转换 */
        htmlTransform: {
          /** 模板渲染数据，如果使用自己的模板，则自己定义渲染数据 */
          render: {
            //图标
            favicon: './assets/mkh/favicon.ico',
            /** 版权信息 */
            copyright: '版权所有：OLDLI',
            /** Logo */
            logo: './assets/mkh/logo.png',
          },
          /** 压缩配置 */
          minify: {},
        },
      }),
      vue(),
    ],
    server: {
      port: 622,
    },
    css: {
      postcss: {
        plugins: [
          {
            /** 解决打包时出现 warning: "@charset" must be the first rule in the file */
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
            /**转换css中图片的相对路径 */
            Declaration(decl) {
              let reg = /url\((.+?)\)/gi
              if (decl.value.match(reg)) {
                decl.value = replaceAll('../', '', decl.value)
              }
            },
          },
        ],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '../package'),
        '#': resolve(__dirname, '../src'),
      },
    },
  }
}
