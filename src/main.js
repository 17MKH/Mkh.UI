import { configure } from '../package/index.js'
import './index.js'
import '$mkh-locale/zh-cn'
import '$mkh-locale/en' //导入英文语言包

configure({
  locale: {
    /** 默认语言 */
    default: 'en',
  },
  beforeMount({ config }) {
    config.site.title = '17MKH'

    // config.site.title = {
    //   'zh-cn': '17MKH',
    //   en: '17MKH English',
    // }

    config.site.home = '/doc/home'
    /** 配置登录组件 */
    config.component.login = 'k'
  },
})
