import { configure } from '../package/index.js'
import zhCN from '@mkh-locale/zh-cn'
import en from '@mkh-locale/en'
import './mod.js'

MkhUI.config.site.logo = './logo.png'
MkhUI.config.site.title = '业务模块化快速开发平台'

/** 为什么不设置一个默认语言包呢？ */
/** 因为不知道有多少模块集成，也就无法在打包的时候动态加载模块的语言包文件，所以必须手动导入语言包 */
configure({ locale: { messages: [zhCN, en] } })
