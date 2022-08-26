import type { PluginContextOptions } from './plugins-types'
import useCtx from './utils/context'
import { external } from './utils/constants'
import loadAssets from './load-assets'

export default function (options: PluginContextOptions) {
  options.isSkin = true
  const ctx = useCtx(options)
  return [loadAssets(ctx)]
}

export { external }
