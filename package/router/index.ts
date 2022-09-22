import type { App } from 'vue'
import type { ModuleDefinition, PageDefinition } from '@/types'
import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'
import { useConfigStore, useTokenStore, useProfileStore } from '@/store'

// 进度条初始值
NProgress.configure({ minimum: 0.2 })

//验证值是否为true
const isTrue = (val: boolean | undefined | null) => {
  return typeof val === 'undefined' || val === null ? true : val
}

/**
 * 页面转路由
 */
const page2route = (page: PageDefinition, pages: Array<PageDefinition>, parentRoute?: RouteRecordRaw) => {
  /**********************************************
   * 页面属性与路由属性对应关系以及说明
   **********************************************
   * icon                             页面默认图标，也是菜单默认图标
   * path                             路由地址
   * name                             路由名称
   * component                        路由对应组件
   * inFrame                          页面在框架中显示，有些页面可能是独立的，比如登陆页面，则该属性需要设置为false
   * hideMenu                         隐藏菜单
   * enablePermissionVerify           启用权限验证
   * permissions                      页面绑定的权限列表
   * buttons                          页面绑定的按钮信息
   * breadcrumbs                      页面的面包屑信息
   * cache                            页面是否缓存，路由的keep-alive特性
   * props                            路由启用props特性
   * noMenu
   */
  const { icon, path, name, component, inFrame, hideMenu, permissionVerify, permissions, buttons, breadcrumbs, cache, props } = page

  const route: RouteRecordRaw = {
    path,
    name,
    component,
    props,
    meta: {
      icon,
      buttons,
      permissions,
      breadcrumbs,
      cache: isTrue(cache),
      inFrame: isTrue(inFrame),
      hideMenu: !isTrue(hideMenu),
      enablePermissionVerify: isTrue(permissionVerify),
    },
    children: [],
  }
  if (!parentRoute) {
    routes.push(route)
    pages
      .filter((p) => p.parent === name)
      .forEach((p) => {
        page2route(p, pages, route)
      })
  } else {
    if (!parentRoute.children) parentRoute.children = []

    parentRoute.children.push(route)
  }
}

//路由实例
let router: Router

export default (app: App, modules: ModuleDefinition[]) => {
  //页面转换路由
  modules
    .filter((m) => m.pages)
    .forEach((m) => {
      m.pages
        .filter((p) => !p.parent)
        .forEach((p) => {
          page2route(p, m.pages)
        })
    })

  //创建路由实例
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  const configStore = useConfigStore()
  const tokenStore = useTokenStore()
  const profileStore = useProfileStore()

  router.beforeEach(async (to, from) => {
    // 开始进度条
    NProgress.start()

    //首页跳转
    if (to.name === 'home') {
      if (configStore.site && configStore.site.homePage) {
        return configStore.site.homePage
      }
    }

    //验证是否登录
    if (to.name !== 'login') {
      const { enablePermissionVerify } = to.meta
      if (enablePermissionVerify) {
        const { accessToken } = tokenStore
        if (!accessToken) {
          return '/login'
        }

        //加载个人信息
        if (!profileStore.accountId) {
          try {
            await profileStore.init()
          } catch (err) {
            console.log(err)
            tokenStore.clear()

            return '/login'
          }
        }
      }
    }

    // 关闭进度条
    NProgress.done()
  })

  app.use(router)
}

export { router }
