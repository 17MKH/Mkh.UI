import { createI18n } from 'vue-i18n'
import db from '../utils/db'

let i18n

export default (app, options) => {
  const messages = {}

  mkh.localeMessages.forEach(locale => {
    const { el, ui, mod, skin } = locale
    if (mkh.locales.findIndex(m => m.value === ui.code) < 0) {
      //将语言集保存下来
      mkh.locales.push({
        label: ui.name,
        value: ui.code,
      })
    }

    /** 对模块中的路由特殊处理，路由名称是唯一的，所以将所有模块中的路由统一放到mkh.routes中，方便使用 */
    ui.messages.routes = []

    Object.values(mod).forEach(m => {
      if (m.routes) {
        Object.keys(m.routes).forEach(k => {
          ui.messages.routes[k] = m.routes[k]
        })

        delete m.routes
      }
    })
    messages[ui.code] = { name: ui.code, el, mkh: ui.messages, mod, skin }
  })

  //删除无用的属性
  delete mkh.localeMessages

  let lang = db.get('lang')

  i18n = createI18n({
    locale: lang || options.default || 'zh-cn',
    fallbackLocale: options.fallback || 'zh-cn',
    messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
  })

  //注册国际化
  app.use(i18n)

  //将多语言方法挂载到mkh
  mkh.$t = i18n.global.t
}

export { i18n }
