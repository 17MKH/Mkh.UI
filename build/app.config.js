/** 应用模式 */

import { defineConfig } from 'vite'
import useBaseConfig from './base.config'

export default defineConfig(({ mode, command }) => {
  return useBaseConfig({ target: 'app', mode, command })
})
