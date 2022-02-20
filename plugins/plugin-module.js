import useCtx from './utils/context'
import htmlTransform from './html-transform'
import loadEntryModule from './load-entry-module'
import loadDependencyModule from './load-dependency-module'
import loadPage from './load-page'
import loadLocale from './load-locale'
import loadAssets from './load-assets'
import loadSkin from './load-skin'

export default function (options) {
  const ctx = useCtx(options.mode)

  if (ctx.isLib) {
    return [loadEntryModule(ctx), loadPage(ctx), loadAssets(ctx)]
  }

  return [htmlTransform(options.htmlTransform || {}), loadEntryModule(ctx), loadDependencyModule(ctx), loadPage(ctx), loadSkin(ctx), loadLocale(ctx), loadAssets(ctx)]
}
