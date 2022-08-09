import type { PluginContextOptions } from './plugins-types'
import type { Plugin } from 'vite'
import useCtx from './utils/context'
import htmlTransform from './html-transform'
import loadEntryModule from './load-entry-module'
import loadPage from './load-page'
import loadLocales from './load-locales'
import loadAssets from './load-assets'
import loadMain from './load-main'

export default function (options: PluginContextOptions): Plugin[] {
  options.isUI = true
  const ctx = useCtx(options)

  if (ctx.isLib) {
    return [loadAssets(ctx)]
  }

  return [loadMain(ctx), loadEntryModule(ctx), loadPage(ctx), loadLocales(ctx), loadAssets(ctx), ...htmlTransform(options.htmlTransform || { render: {}, minify: {} })]
}
