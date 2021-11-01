const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkh from './plugins/plugin-mkh'

export default defineConfig(({ mode, command }) => {
  let config = {
    plugins: [
      mkh({
        mode,
        command,
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
  }

  //打包成库
  if (mode == 'lib') {
    //库模式需要取消复制静态资源目录
    config.publicDir = false

    config.build = {
      lib: {
        entry: resolve(__dirname, 'package/index.js'),
        formats: ['es'],
        fileName: 'index',
      },
      outDir: 'lib',
      // minify: false,
      rollupOptions: {
        /** 排除无需打包进去的依赖库 */
        external: ['vue', 'vue-router', 'vuex', 'element-plus', 'lodash', 'sortablejs', 'vue-i18n'],
      },
    }
  }
  return config
})
