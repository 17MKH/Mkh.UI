import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mui from './plugins/plugin-ui'
import libConfig from './build/lib.config'
import devConfig from './build/dev.config'
import prodConfig from './build/prod.config'

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
  console.log(mode)
  switch (mode) {
    case 'lib':
      libConfig(config)
      break
    case 'development':
      devConfig(config)
      break
    case 'production':
      prodConfig(config)
      break
  }

  return config
})
