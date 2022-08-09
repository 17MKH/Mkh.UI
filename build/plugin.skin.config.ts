import typescript from 'rollup-plugin-typescript2'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'plugins/plugin-skin.ts',
  output: {
    dir: 'lib/plugins',
    format: 'cjs',
    name: 'skin.js',
  },
  plugins: [typescript({ tsconfigOverride: { compilerOptions: { declaration: false }, include: ['plugins/plugin-skin.ts'] } })],
})
