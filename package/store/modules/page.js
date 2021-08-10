import { router } from '../../router'
import db from '../../utils/db'
const dbKey = 'tabnav'

const state = {
  /**当前页信息 */
  current: {},
  /**已缓存页面路由名称 */
  cached: [],
  /**已打开页面 */
  opened: [],
}

const actions = {
  /**
   * @description 打开页面
   */
  open({ commit }, route) {
    let { meta, query } = route
    let { site } = mkh.config

    //设置网页标题
    document.title = meta.title || site.title

    //不在框架中的页面不做处理
    if (!meta.inFrame) return

    //设置缓存
    if (meta.cache) {
      commit('cachePush', route.name)
    }

    console.log(route)
    commit('setCurrent', route)

    //首页不做额外处理
    if (route.fullPath === site.home) return

    commit('openedPush', {
      fullPath: route.fullPath,
      label: query._tn_ || meta.title, //如果路由包含_tn_参数，则使用该参数设置标签名称，否则取路由的title元数据
      icon: meta.icon,
      routeName: route.name,
      cache: meta.cache,
    })
  },
  /**
   * @description 关闭页面
   */
  close({ commit, state }, index) {
    const { current, opened } = state
    if (index > -1) {
      let page = opened[index]

      // 如果删除的是当前页，则打开一个新的页面
      if (page.fullPath === current.fullPath) {
        router.push(index > 0 ? opened[index - 1].fullPath : '/')
      }

      commit('openedRemove', index)

      //删除缓存
      commit('cacheRemove', page)
    }
  },
  closeLeft({ commit, state }, index) {
    if (index > 0) {
      //删除缓存
      for (let i = 0; i < index; i++) {
        commit('cacheRemove', state.opened[i])
      }

      commit('openedRemoveLeft', index)
    }
  },
  closeRight({ commit, state }, index) {
    const { opened } = state
    if (index < opened.length - 1) {
      //删除缓存
      for (let i = index + 1; i < opened.length; i++) {
        commit('cacheRemove', opened[i])
      }

      commit('openedRemoveRight', index)
    }
  },
  closeOther({ commit, state }, index) {
    const { opened } = state
    if (index < opened.length - 1) {
      //删除缓存
      for (let i = 0; i < opened.length; i++) {
        if (i != index) commit('cacheRemove', opened[i])
      }

      //先删除左侧在删除右侧
      commit('openedRemoveLeft', index)
      commit('openedRemoveRight', 0)
    }
  },
  closeAll({ commit }) {
    router.push('/')
    commit('openedClear')
    commit('cacheClear')
  },
}

const mutations = {
  /**初始化 */
  init(state) {
    //从存储中获取数据
    let opened = db.get(dbKey)
    if (opened) {
      state.opened = opened || []
    }
  },
  /**设置当前页面 */
  setCurrent(state, route) {
    state.current = route
  },
  /**添加缓存 */
  cachePush(state, routeNmae) {
    if (!state.cached.find(m => m === routeNmae)) state.cached.push(routeNmae)
  },
  /**删除缓存 */
  cacheRemove(state, page) {
    if (page.cache) {
      let index = state.cached.findIndex(m => m === page.routeName)
      if (index > -1) {
        state.cached.splice(index, 1)
      }
    }
  },
  /**清空缓存 */
  cacheClear(state) {
    state.cached.length = 0
  },
  /**保存已打开页面 */
  openedPush(state, route) {
    if (!state.opened.find(m => m.fullPath === route.fullPath)) {
      state.opened.push(route)
      db.set(dbKey, state.opened)
    }
  },
  /**删除已打开页面 */
  openedRemove(state, index) {
    state.opened.splice(index, 1)
    console.log(JSON.stringify(state.opened))
    db.set(dbKey, state.opened)
  },
  /**删除左侧页面 */
  openedRemoveLeft(state, index) {
    state.opened.splice(0, index)
    db.set(dbKey, state.opened)
  },
  /**删除右侧页面 */
  openedRemoveRight(state, index) {
    state.opened.splice(index + 1, state.opened.length - index - 1)
    db.set(dbKey, state.opened)
  },
  /**清空页面 */
  openedClear(state) {
    state.opened.length = 0
    db.set(dbKey, state.opened)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
