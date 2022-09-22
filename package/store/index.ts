import type { App } from 'vue'
import { createPinia } from 'pinia'
import initConfigStore, { useConfigStore } from './modules/config'
import { Config } from '@/types'

export default (app: App<Element>, defaultConfig: Config) => {
  app.use(createPinia())

  initConfigStore(defaultConfig)
}

export { useConfigStore }
export { useComponentStore } from './modules/component'
export { useProfileStore } from './modules/profile'
export { useSkinStore } from './modules/skin'
export { useTokenStore } from './modules/token'
