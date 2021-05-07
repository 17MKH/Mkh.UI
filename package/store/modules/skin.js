//皮肤功能状态

const state = {
  /** 名称 */
  name: '简约',
  /** 编码 */
  code: 'brief',
  /** 主题 */
  theme: 'dark',
  /** 字号 */
  fontSize: 'small',
}

const getters = {
  fontSize(state) {
    return state.current.fontSize
  },
}

const mutations = {
  /**
   * @description 初始化
   */
  init(state, { code, theme, fontSize }) {
    let skin = MkhUI.skins.find(m => m.code === code)
    if (skin) {
      state.name = skin.name
      state.code = skin.code
      state.theme = theme
      state.fontSize = fontSize
    }
  },
  /**
   * @description 皮肤切换
   */
  toggle(state, code) {
    let skin = MkhUI.skins.find(m => m.code === code)
    if (skin) {
      state.name = skin.name
      state.code = skin.code
      state.theme = skin.theme
      state.fontSize = skin.fontSize
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  modules: {},
}
