import { bootstrap, useAppCreatedService, useModule } from '@/index'
import options from './options'
import mod_doc from './index.js'
//import m from 'mkh-skin-sky';

useModule(mod_doc)

useAppCreatedService(({ config }) => {
  config.site.title = '17MKH'

  // config.site.title = {
  //   'zh-cn': '17MKH',
  //   en: '17MKH English',
  // }

  config.site.homePage = '/doc/home'
  /** 配置登录组件 */
  config.component.login = 'k'
})

bootstrap(options)
