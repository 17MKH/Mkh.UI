import useCtx from './utils/context'
import htmlTransform from './html-transform'
import loadEntryModule from './load-entry-module'
import loadPage from './load-page'
import loadLocale from './load-locale'
import loadAssets from './load-assets'

export default function (options) {
  const ctx = useCtx(options.mode)

  if (ctx.isLib) {
    return [loadAssets(ctx)]
  }

  return [htmlTransform(options.htmlTransform || {}), loadEntryModule(ctx), loadPage(ctx), loadLocale(ctx), loadAssets(ctx)]
}
