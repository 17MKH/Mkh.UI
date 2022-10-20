import type { Config } from '@/types'
import { defineStore } from 'pinia'
import { defaultConfig } from '@/defaults'
import _ from 'lodash'

const state = (): Config => {
  return _.cloneDeep(defaultConfig)
}

export const useConfigStore = defineStore('app.config', {
  state,
})
