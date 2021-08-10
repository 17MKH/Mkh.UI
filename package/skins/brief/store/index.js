const state = {
  menuIsCollapse: false,
}

const mutations = {
  //切换菜单折叠状态
  toggleMenuCollapse(state) {
    state.menuIsCollapse = !state.menuIsCollapse
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
