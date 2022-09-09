import typescript from 'rollup-plugin-typescript2'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'plugins/plugin-module.ts',
  output: {
    format: 'module',
    file: 'lib/plugins/index.js',
  },
  plugins: [typescript({ tsconfigOverride: { compilerOptions: { declaration: false }, include: ['plugins/plugin-module.ts'] } })],
})
