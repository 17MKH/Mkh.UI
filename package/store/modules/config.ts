import type { ConfigState } from '@/types/store'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('app.config', {
  state: (): ConfigState => ({
    site: {},
    auth: {},
    component: {},
    systemActions: {},
    skin: {},
  }),
})
