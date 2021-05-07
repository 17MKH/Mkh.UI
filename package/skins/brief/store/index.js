const state = {
  menuIsCollapse: false,
}

const mutations = {
  //折叠菜单
  collapseMenu(state) {
    state.menuIsCollapse = !state.menuIsCollapse
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
