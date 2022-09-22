import { SkinDefinition } from '@/types'
import { defineStore } from 'pinia'

export const useSkinStore = defineStore('app.skin', {
  state: (): { skins: SkinDefinition[] } => {
    return {
      skins: [],
    }
  },
})
