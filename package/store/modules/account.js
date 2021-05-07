import { router } from '../../router'

// 解析路由菜单和面包屑信息
const routeMenus = new Map()
const resolveRouteMenus = (menu, rootId) => {
  if (menu.type === 1) {
    menu.rootId = rootId

    //解析菜单对应的路由信息并保存到menu的to属性，方便后续直接使用
    const { routeName, routeQuery, routeParams } = menu
    menu.to = { name: routeName }
    if (routeQuery) {
      menu.to.query = JSON.parse(routeQuery)
    }
    if (routeParams) {
      menu.to.params = JSON.parse(routeParams)
    }

    //使用router.resolve方法来解析出菜单的完整路径
    //此处解决了NetModular.UI中同一个路由页面需要配置多个菜单的情况下菜单高亮定位问题~
    routeMenus.set(router.resolve(menu.to).fullPath, menu)
  } else if (menu.type === 0) {
    menu.children.map(m => {
      resolveRouteMenus(m, rootId)
    })
  }
}

//账户信息
const state = {
  /**编号 */
  id: '',
  /**用户名 */
  username: '',
  /**昵称 */
  nickname: '',
  /**头像 */
  avatar: '',
  /** 菜单列表 */
  menus: [],
  /** 权限列表 */
  permissions: [],
  /** 按钮列表 */
  buttons: [],
  /** 皮肤 */
  skin: {
    /** 名称 */
    name: '简约',
    /**编码 */
    code: 'brief',
    /** 主题 */
    theme: '',
    /** 尺寸  */
    size: 'small',
  },
  /**账户详细信息，用于开发者自定义扩展 */
  details: null,
  routeMenus,
}

const actions = {
  async init({ commit }) {
    //获取账户信息
    const accountInfo = await MkhUI.config.actions.getAccountInfo()

    //初始化皮肤
    if (accountInfo.skin) commit('app/skin/init', accountInfo.skin, { root: true })

    //解析路由菜单信息
    accountInfo.menus.forEach(m => {
      resolveRouteMenus(m, m.id)
    })

    commit('init', accountInfo)
  },
}

const mutations = {
  init(state, info) {
    Object.assign(state, info)
  },
  clear(state) {
    state.id = ''
    state.username = ''
    state.nickname = ''
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
