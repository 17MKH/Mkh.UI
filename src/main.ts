import { bootstrap, useAppService } from '@/index'
import options from './options'
import './index.js'

useAppService(({ config }) => {
  config.site.title = '17MKH'

  // config.site.title = {
  //   'zh-cn': '17MKH',
  //   en: '17MKH English',
  // }

  config.site.home = '/doc/home'
  /** 配置登录组件 */
  config.component.login = 'k'
})

bootstrap(options)
