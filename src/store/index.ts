import { defineStore } from 'pinia'

export default defineStore('mod.doc', {
  state: (): { test: string[] } => {
    return {
      test: [],
    }
  },
})
