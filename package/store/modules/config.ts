import type { Config } from '@/types'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('app.config', {
  state: (): Partial<Config> => ({}),
})
