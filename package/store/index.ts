import type { App } from 'vue'
import { createPinia } from 'pinia'

export default (app: App<Element>) => {
  app.use(createPinia())
}

export { useConfigStore } from './modules/config'
export { useProfileStore } from './modules/profile'
export { useTokenStore } from './modules/token'
