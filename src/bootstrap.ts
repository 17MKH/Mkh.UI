import { bootstrap, useModule } from '../package/index.js'
import options from './options'
import mod from './index.js'

useModule(mod)

bootstrap(options)
