/** 打包库模式 */
const { resolve } = require('path')

export default config => {
  //需要取消复制静态资源目录
  config.publicDir = false
  config.build = {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, '../package/index.js'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      /** 排除无需打包进去的依赖库 */
      external: ['vue', 'vue-router', 'vuex', 'element-plus', 'lodash', 'sortablejs', 'vue-i18n'],
    },
  }
}
