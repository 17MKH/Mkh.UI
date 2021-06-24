import { createStore } from 'vuex'
import profile from './modules/profile'
import page from './modules/page'
import skin from './modules/skin'
import token from './modules/token'

let store = null

export default app => {
  const options = {
    modules: {
      //系统模块
      app: {
        namespaced: true,
        modules: {
          profile,
          skin,
          page,
          token,
        },
      },
      //业务模块
      mod: {
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

  store = createStore(options)

  app.use(store)
}

export { store }
