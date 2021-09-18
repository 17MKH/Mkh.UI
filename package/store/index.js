import { createStore } from 'vuex'
import config from './modules/config'
import profile from './modules/profile'
import token from './modules/token'

export default app => {
  const options = {
    modules: {
      //系统模块
      app: {
        namespaced: true,
        modules: {
          config,
          profile,
          token,
        },
      },
      //业务模块
      mod: {
        namespaced: true,
        modules: {},
      },
      //皮肤
      skin: {
        namespaced: true,
        modules: {},
      },
    },
  }

  mkh.modules
    .filter(m => m.store)
    .forEach(m => {
      options.modules.mod.modules[m.code] = m.store
    })

  const store = createStore(options)

  app.use(store)

  mkh.store = store
}
