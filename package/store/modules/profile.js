//解析自定义菜单
const resolveMenu = async (profile, menus) => {
  if (!menus) return

  if (typeof menus === 'function') {
    profile.menus = await menus(profile)
  } else if (typeof menus == 'object') {
    profile.menus = menus
  }
}

//解析节点路由并保存
const resolveRouteMenu = (profile, menus, home, parent) => {
  menus.forEach(m => {
    //面包屑
    m.breadcrumb = []
    if (parent) {
      //添加父级
      m.breadcrumb = m.breadcrumb.concat(parent.breadcrumb)
    }

    //保存节点路由
    if (m.type === 1) {
      profile.routeMenus.push(m)
      if (m.buttons) {
        m.buttons.forEach(b => {
          profile.buttons.push(`${m.id}_${b}`)
        })
      }
      if (m.routeQuery) {
        m.routeQuery = JSON.parse(m.routeQuery)
      }
      if (m.routeParams) {
        m.routeParams = JSON.parse(m.routeParams)
      }

      m.breadcrumb.push({ to: m.routeName, routeQuery: m.routeQuery, routeParams: m.routeParams, locales: m.locales })
    } else if (m.children) {
      m.breadcrumb.push({ locales: m.locales })
      resolveRouteMenu(profile, m.children, home, m)
    }
  })
}

//账户信息
const state = {
  /** 账户编号 */
  accountId: '',
  /** 用户名 */
  username: '',
  /** 昵称 */
  nickname: '',
  /** 头像 */
  avatar: '',
  /** 菜单列表 */
  menus: [],
  /** 权限列表 */
  permissions: [],
  /** 账户详细信息，用于开发者自定义扩展 */
  details: null,
  /** 路由菜单列表 */
  routeMenus: null,
  /** 按钮编码列表，说明：此处的按钮编码由菜单编号_按钮唯一编码组成 */
  buttons: [],
  /** 皮肤 */
  skin: {
    name: '简约',
    code: 'brief',
    theme: 'dark',
    size: '',
  },
}

const actions = {
  async init({ commit, rootState }) {
    try {
      //获取账户信息
      const profile = await rootState.app.config.actions.getProfile()

      //设置菜单
      await resolveMenu(profile, rootState.app.config.site.menus)

      profile.routeMenus = []
      profile.buttons = []

      //解析路由菜单
      resolveRouteMenu(profile, profile.menus, rootState.app.config.site.home)

      if (!profile.skin || !profile.skin.code || mkh.skins.every(m => m.code !== profile.skin.code)) {
        if (rootState.app.config.skin) {
          let skin = rootState.app.config.skin
          profile.skin = {
            name: skin.name,
            code: skin.code,
            theme: skin.theme,
            size: skin.size,
          }
        } else {
          let skin = mkh.skins[0]

          profile.skin = {
            name: skin.name,
            code: skin.code,
            theme: skin.themes[0].name,
            size: '',
          }
        }
      }
      if (!profile.skin.size) {
        profile.skin.size = 'default'
      }

      commit('init', profile)
    } catch (error) {
      console.log(error)
    }
  },
}

const mutations = {
  /**
   * @description 初始化
   */
  init(state, profile) {
    Object.assign(state, profile)
  },
  /**
   * @description 清除账户信息
   */
  clear(state) {
    state.accountId = ''
    state.username = ''
    state.nickname = ''
  },
  /**
   * @description 切换皮肤
   */
  toggleSkin(state, { name, code, theme, size }) {
    state.skin.name = name
    state.skin.code = code
    state.skin.theme = theme
    state.skin.size = size
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
