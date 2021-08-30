import { configure } from '../package/index.js'
import zhCN from '@mkh-locale/zh-cn'
import en from '@mkh-locale/en'
import './index.js'

configure({
  /** 为什么不设置一个默认语言包呢？ */
  /** 因为不知道有多少模块集成，也就无法在打包的时候动态加载模块的语言包文件，所以必须手动导入语言包 */
  locale: { messages: [zhCN, en] },
  beforeMount({ config }) {
    config.site.title = '17MKH'
    config.site.home = '/doc/home'
    /** 配置登录组件 */
    config.component.login = 'k'
  },
})
