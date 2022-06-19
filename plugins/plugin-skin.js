import useCtx from './utils/context'
import { external } from './utils/constants'
import loadPage from './load-page'
import loadAssets from './load-assets'

export default function (options) {
  options.isSkin = true
  const ctx = useCtx(options)
  return [loadPage(ctx), loadAssets(ctx)]
}

export { external }
