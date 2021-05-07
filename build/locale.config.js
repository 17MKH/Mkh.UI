const fs = require('fs')

const createConfig = fileName => ({
  input: `lang/${fileName}`,
  output: [
    {
      file: `lib/lang/${fileName}`,
      format: 'es',
    },
  ],
})

const configs = fs.readdirSync('lang').map(m => createConfig(m))

export default configs
