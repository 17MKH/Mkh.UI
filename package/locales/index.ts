import type { BootstrapOptions, Locale } from '@/types'
import { LOCALE_DEFINITIONS } from '@/utils/constants'
import { defaultBootstrapOptions } from '@/defaults'
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import db from '@/utils/db'

export default (app: App, options: BootstrapOptions) => {
  const lang = db.get<Locale>('lang')
  const browserLang = navigator.language == 'zh-CN' ? LOCALE_DEFINITIONS.ZhCN : LOCALE_DEFINITIONS.En
  const localeOptions = options.locale || defaultBootstrapOptions.locale
  console.log(options.locale.messages)
  const i18n = createI18n<{}, Locale>({
    legacy: false,
    locale: lang || browserLang || localeOptions.default || LOCALE_DEFINITIONS.ZhCN,
    fallbackLocale: localeOptions.fallback || LOCALE_DEFINITIONS.ZhCN,
    messages: options.locale.messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
  })

  //注册国际化
  app.use(i18n)
}
