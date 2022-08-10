import type { Config } from '@/types'
import { defineStore } from 'pinia'
import { defaultConfig } from '@/defaults'

export const useConfigStore = defineStore('app.config', {
  state: (): Config => defaultConfig,
})
