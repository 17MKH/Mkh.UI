const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkh from './plugins/plugin-mkh'
import loadCode from './plugins/load-code'

export default defineConfig({
  plugins: [
    mkh({
      /** index.html文件转换 */
      htmlTransform: {
        /** 自定义index.html文件，使用完整路径，不指定使用默认的，也就是根目录的index.html文件 */
        custom: resolve(__dirname, './entries/index.html'),
        /** 模板渲染数据，如果使用自己的模板，则自己定义渲染数据 */
        render: {
          /** 版权信息 */
          copyright: '版权所有：OLDLI',
          /** Logo */
          logo: './logo.png',
        },
        /** 压缩配置 */
        htmlMinify: {},
      },
    }),
    loadCode(),
    vue(),
  ],
  server: {
    port: 6220,
  },
  build: {
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
  },
  resolve: {
    alias: {
      '@': resolve(__dirname),
    },
  },
})
