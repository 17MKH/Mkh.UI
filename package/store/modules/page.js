// 页面信息

const state = {
  /**当前页信息 */
  current: {},
  /**已缓存页面 */
  cached: [],
}

const actions = {
  /**
   * @description 打开页面
   */
  open({ commit }, route) {
    document.title = route.meta.title || MkhUI.config.site.title
    commit('setCurrent', route)
  },
}

const mutations = {
  setCurrent(state, current) {
    Object.assign(state.current, current)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
