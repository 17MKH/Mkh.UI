import type { Breadcrumb, Locales, Menu, Profile } from '@/types'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { useSkinStore } from './skin'
import { defaultProfile } from '@/defaults'
import _ from 'lodash'

//解析自定义菜单
const resolveMenu = async (profile: Profile, menus) => {
  if (typeof menus === 'function') {
    profile.menus = await menus(profile)
  } else if (typeof menus == 'object') {
    profile.menus = menus
  }
}

//解析节点路由并保存
const resolveRouteMenu = (profile: Profile, menus: Array<Menu>, parent?: Menu) => {
  menus.forEach((m) => {
    //面包屑
    m.breadcrumb = []
    if (parent) {
      //添加父级
      m.breadcrumb = m.breadcrumb.concat(parent.breadcrumb as Breadcrumb[])
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

      m.breadcrumb.push({ to: m.routeName, routeQuery: m.routeQuery as any, routeParams: m.routeParams as any, locales: m.locales as Locales })
    } else if (m.children) {
      m.breadcrumb.push({ locales: m.locales as Locales })
      resolveRouteMenu(profile, m.children, m)
    }
  })
}

const state = (): Profile => {
  return _.cloneDeep(defaultProfile)
}

const actions = {
  /**
   * 初始化账户信息，调用接口
   */
  async init() {
    try {
      const configStore = useConfigStore()
      const skinStore = useSkinStore()

      //获取账户信息
      if (configStore.systemActions && configStore.systemActions.getProfile) {
        const profile = await configStore.systemActions.getProfile()

        profile.routeMenus = []
        profile.buttons = []

        //设置自定义菜单
        if (configStore.site && configStore.site.menus) {
          await resolveMenu(profile, configStore.site.menus)
        }

        //解析路由菜单
        resolveRouteMenu(profile, profile.menus)

        if (!profile.skin || !profile.skin.code || skinStore.skins.every((m) => m.code !== profile.skin.code)) {
          if (configStore.skin) {
            let skin = configStore.skin
            profile.skin = {
              name: skin.name,
              code: skin.code,
              theme: skin.theme,
              size: skin.size,
            }
          } else {
            let skin = skinStore.skins[0]

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
      }
    } catch (error) {
      console.log(error)
    }
  },
  /**
   *
   * @param this - 清除账户信息
   */
  clear(this: Profile) {
    this.accountId = ''
    this.username = ''
    this.nickname = ''
  },
}

export const useProfileStore = defineStore('app.profile', {
  state,
  actions,
})
