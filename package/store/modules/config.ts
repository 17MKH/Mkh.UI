import type { Config } from '@/types'
import { defineStore, StoreDefinition } from 'pinia'

let useConfigStore: StoreDefinition<'app.config', Config>

export default (defaultConfig: Config) => {
  useConfigStore = defineStore('app.config', {
    state: (): Config => defaultConfig,
  })
}

export { useConfigStore }
