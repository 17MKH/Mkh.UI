import { configure } from '../package/index.js'
import '$mkh-locale/en' //导入英文语言包
import './index.js'

configure({
  beforeMount({ config }) {
    config.site.title = '17MKH'
    config.site.home = '/doc/home'
    /** 配置登录组件 */
    config.component.login = 'k'
  },
})
