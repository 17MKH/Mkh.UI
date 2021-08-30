import { createI18n } from 'vue-i18n'

let i18n

export default (app, options) => {
  const messages = {}
  mkh.localeMessages.forEach(locale => {
    const { el, ui, mod } = locale
    //将语言集保存下来
    mkh.locales.push({
      label: ui.name,
      value: ui.code,
    })

    messages[ui.code] = { name: ui.code, el, mkh: ui.messages, mod }
  })

  //删除无用的属性
  delete mkh.localeMessages

  i18n = createI18n({
    locale: options.default || 'zh-cn',
    fallbackLocale: options.fallback || 'zh-cn',
    messages,
  })

  //注册国际化
  app.use(i18n)
}
export { i18n }
