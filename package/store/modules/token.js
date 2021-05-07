import db from '../../utils/db'
import { router } from '../../router'
const key = `token`

export default {
  namespaced: true,
  state: {
    /** 请求令牌 */
    accessToken: '',
    /** 刷新令牌 */
    refreshToken: '',
  },
  actions: {
    /**
     * @description 退出
     */
    logout({ commit }) {
      // 清楚令牌信息
      commit('clear')

      // 清除账户信息
      commit('app/account/clear', null, { root: true })

      // 跳转到登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath,
        },
      })
    },
  },
  mutations: {
    /**
     * 从本地存储中加载令牌
     */
    loadFromlocalStorage(state) {
      const token = db.get(key)
      if (token) {
        state.accessToken = token.accessToken
        state.refreshToken = token.refreshToken
      }
    },
    /**
     * 初始化令牌，如果不传则会从本地存储中获取
     */
    init(state, token) {
      if (!token) {
        token = db.get(key)
      }
      if (token) {
        state.accessToken = token.accessToken
        state.refreshToken = token.refreshToken
      }

      db.set(key, token)
    },
    /**
     * 清楚令牌
     */
    clear(state) {
      state.accessToken = ''
      state.refreshToken = ''
      db.remove(key)
    },
  },
}
