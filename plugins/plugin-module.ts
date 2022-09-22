import type { PluginContextOptions } from './plugins-types'
import useCtx from './utils/context'
import { external } from './utils/constants'
import htmlTransform from './html-transform'
import loadEntryModule from './load-entry-module'
import loadAssets from './load-assets'

export default function mui(options: PluginContextOptions) {
  options.isMod = true
  const ctx = useCtx(options)

  if (ctx.isLib) {
    return [loadEntryModule(ctx), loadAssets(ctx)]
  }

  return [loadEntryModule(ctx), loadAssets(ctx), htmlTransform(options.htmlTransform || { render: {}, minify: {} })]
}

export { external, PluginContextOptions }
