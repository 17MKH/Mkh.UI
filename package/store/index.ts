import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export default (app: App<Element>) => {
  app.use(store)
}

export { useConfigStore } from './modules/config'
export { useProfileStore } from './modules/profile'
export { useTokenStore } from './modules/token'
