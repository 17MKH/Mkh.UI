import { createI18n } from 'vue-i18n'

let i18n

export default (app, options) => {
  const messages = {}
  options.messages.forEach(locale => {
    const { el, mkh, mod } = locale
    //将语言集保存下载
    MkhUI.locales.push({
      label: mkh.name,
      value: mkh.code,
    })

    messages[mkh.code] = { el, mkh: mkh.messages, mod }
  })

  i18n = createI18n({
    locale: options.default || 'zh-cn',
    fallbackLocale: options.fallback || 'zh-cn',
    messages,
  })

  //注册国际化
  app.use(i18n)
}

export { i18n }
