import type { PluginContextOptions } from './plugins-types'
import type { Plugin } from 'vite'
import useCtx from './utils/context'
import htmlTransform from './html-transform'
import loadEntryModule from './load-entry-module'
import loadAssets from './load-assets'

export default function mui(options: PluginContextOptions): Plugin[] {
  options.isUI = true
  const ctx = useCtx(options)

  if (ctx.isLib) {
    return [loadAssets(ctx)]
  }
  return [loadEntryModule(ctx), loadAssets(ctx), ...htmlTransform(options.htmlTransform || { render: {}, minify: {} })]
}
