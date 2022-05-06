const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mui from '../plugins/plugin-ui'

export default defineConfig(({ mode, command }) => {
  let config = {
    plugins: [
      mui({
        mode,
        command,
        /** 依赖模块 */
        dependencyModules: [],
        /** 皮肤 */
        skins: [],
        /** 语言包 */
        locales: ['zh-cn', 'en'],
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
          htmlMinify: {},
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
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  }
  //库模式需要取消复制静态资源目录
  config.publicDir = false
  config.build = {
    lib: {
      entry: resolve(__dirname, 'package/index.js'),
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'lib',
    rollupOptions: {
      /** 排除无需打包进去的依赖库 */
      external: ['vue', 'vue-router', 'vuex', 'element-plus', 'lodash', 'sortablejs', 'vue-i18n'],
    },
  }
  return config
})
