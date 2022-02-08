const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

let rootDir = process.cwd()

const createConfig = (input, fileName) => ({
  input,
  output: [
    {
      file: path.resolve(rootDir, `lib/locale/${fileName}`),
      format: 'es',
    },
  ],
})
const pkg = JSON.parse(fs.readFileSync(path.resolve(rootDir, 'package.json')))

let localePath = ''
if (pkg.name === 'mkh-ui') {
  localePath = path.resolve(rootDir, 'package/locale/lang')
} else {
  localePath = path.resolve(rootDir, 'src/locale')
}
export default fs.readdirSync(localePath).map(m => {
  return createConfig(path.resolve(localePath, m), m)
})
