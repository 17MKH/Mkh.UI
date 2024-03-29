import typescript from 'rollup-plugin-typescript2'
import fs from 'fs'
import path from 'path'

let rootDir = process.cwd()

const createConfig = (input, fileName) => ({
  input,
  output: [
    {
      file: path.resolve(rootDir, `lib/locales/${fileName}/index.js`),
      format: 'es',
    },
  ],
  plugins: [typescript({ tsconfigOverride: { compilerOptions: { declaration: false }, include: [input] } })],
})
const pkg = JSON.parse(fs.readFileSync(path.resolve(rootDir, 'package.json')).toString())

let localePath = ''
if (pkg.name === 'mkh-ui') {
  localePath = path.resolve(rootDir, 'package/locales/lang')
} else {
  localePath = path.resolve(rootDir, 'src/locales')
}
export default fs.readdirSync(localePath).map((m) => {
  return createConfig(path.resolve(localePath, m, 'index.ts'), m)
})
