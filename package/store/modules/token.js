import db from '../../utils/db'
const key = `token`

export default {
  namespaced: true,
  state: {
    /** 账户编号 */
    accountId: '',
    /** 请求令牌 */
    accessToken: '',
    /** 刷新令牌 */
    refreshToken: '',
  },
  actions: {
    /**
     * @description 登录
     */
    async login({ commit }, token) {
      if (!token) {
        //尝试从本地加载令牌
        token = db.get(key)
      }
      if (token) {
        commit('set', token)
        db.set(key, token)
      }
    },
    /**
     * @description 退出
     */
    logout({ commit }) {
      // 清除令牌信息
      commit('clear')

      // 清除账户信息
      commit('app/profile/clear', null, { root: true })

      // 跳转到登录页面
      mkh.router.push({
        name: 'login',
        query: {
          redirect: mkh.router.currentRoute.value.fullPath,
        },
      })
    },
  },
  mutations: {
    /**
     * 设置令牌信息
     */
    set(state, { accountId, accessToken, refreshToken }) {
      state.accountId = accountId
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    /**
     * 清除令牌
     */
    clear(state) {
      state.accountId = ''
      state.accessToken = ''
      state.refreshToken = ''
      db.remove(key)
    },
  },
}
