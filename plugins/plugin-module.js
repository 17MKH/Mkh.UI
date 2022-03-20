import useCtx from './utils/context'
import htmlTransform from './html-transform'
import loadEntryModule from './load-entry-module'
import loadDependencyModule from './load-dependency-module'
import loadPage from './load-page'
import loadLocales from './load-locales'
import loadAssets from './load-assets'
import loadMain from './load-main'

export default function (options) {
  const ctx = useCtx(options)

  if (ctx.isLib) {
    return [loadEntryModule(ctx), loadPage(ctx), loadAssets(ctx)]
  }

  return [loadMain(ctx), loadDependencyModule(ctx), loadEntryModule(ctx), loadPage(ctx), loadLocales(ctx), loadAssets(ctx), htmlTransform(options.htmlTransform || {})]
}
