import type { App } from 'vue'
import { createPinia } from 'pinia'

export default (app: App<Element>) => {
  app.use(createPinia())
}

export { useConfigStore } from './modules/config'
export { useComponentStore } from './modules/component'
export { useProfileStore } from './modules/profile'
export { useSkinStore } from './modules/skin'
export { useTokenStore } from './modules/token'
