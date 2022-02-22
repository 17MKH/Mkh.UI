import useCtx from './utils/context'
import htmlTransform from './html-transform'
import loadEntryModule from './load-entry-module'
import loadPage from './load-page'
import loadLocales from './load-locales'
import loadAssets from './load-assets'

export default function (options) {
  const ctx = useCtx(options.mode)

  if (ctx.isLib) {
    return [loadAssets(ctx)]
  }

  return [htmlTransform(options.htmlTransform || {}), loadEntryModule(ctx), loadPage(ctx), loadLocales(ctx), loadAssets(ctx)]
}
