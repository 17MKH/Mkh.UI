import type { ProfileState, ProfileActions } from '@/types/store'
import type { CustomMenus } from '@/types/config'
import type { MkhMenu } from '@/types/menu'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import mkh from '@/mkh'

//解析自定义菜单
const resolveMenu = async (profile: ProfileState, menus: CustomMenus) => {
  if (!menus) return

  if (typeof menus === 'function') {
    profile.menus = await menus(profile)
  } else if (typeof menus == 'object') {
    profile.menus = menus
  }
}

//解析节点路由并保存
const resolveRouteMenu = (profile: ProfileState, menus: Array<MkhMenu>, home: string | object, parent?: MkhMenu) => {
  menus.forEach((m) => {
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
        m.buttons.forEach((b) => {
          profile.buttons.push(`${m.id}_${b}`)
        })
      }
      if (m.routeQuery) {
        m.routeQuery = JSON.parse(m.routeQuery as string)
      }
      if (m.routeParams) {
        m.routeParams = JSON.parse(m.routeParams as string)
      }

      m.breadcrumb.push({ to: m.routeName, routeQuery: m.routeQuery as object, routeParams: m.routeParams as object, locales: m.locales })
    } else if (m.children) {
      m.breadcrumb.push({ locales: m.locales })
      resolveRouteMenu(profile, m.children, home, m)
    }
  })
}

const state = (): ProfileState => {
  return {
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
}

const actions: ProfileActions = {
  async init() {
    try {
      const configStore = useConfigStore()

      //获取账户信息
      const profile = await configStore.actions.getProfile()

      //设置菜单
      await resolveMenu(profile, configStore.site.menus)

      profile.routeMenus = []
      profile.buttons = []

      //解析路由菜单
      resolveRouteMenu(profile, profile.menus, configStore.site.home)

      if (!profile.skin || !profile.skin.code || mkh.skins.every((m) => m.code !== profile.skin.code)) {
        if (configStore.skin) {
          let skin = configStore.skin
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

      Object.assign(this, profile)
    } catch (error) {
      console.log(error)
    }
  },
  clear() {
    this.accountId = ''
    this.username = ''
    this.nickname = ''
  },
}

export const useProfileStore = defineStore('app.profile', {
  state,
  actions,
})
