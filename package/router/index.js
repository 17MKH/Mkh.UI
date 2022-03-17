import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'

// 进度条初始值
NProgress.configure({ minimum: 0.2 })

//验证值是否为true
const isTrue = val => {
  return typeof val === 'undefined' || val === null ? true : val
}

/**
 * @description 页面转路由
 */
const page2route = (page, parentRoute, pages) => {
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
  const { icon, path, name, component, inFrame, hideMenu, enablePermissionVerify, permissions, buttons, breadcrumbs, cache, props } = page

  const route = {
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
      enablePermissionVerify: isTrue(enablePermissionVerify),
    },
    children: [],
  }
  if (!parentRoute) {
    routes.push(route)
    pages
      .filter(p => p.parent === name)
      .forEach(p => {
        page2route(p, route, pages)
      })
  } else {
    parentRoute.children.push(route)
  }

  //从page对象中删除component属性
  delete page.component
}

export default app => {
  //页面转换路由
  mkh.modules
    .filter(m => m.pages)
    .forEach(m => {
      m.pages
        .filter(p => !p.parent)
        .forEach(p => {
          page2route(p, null, m.pages)
        })
    })

  //创建路由实例
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  router.beforeEach(async (to, from) => {
    const { store } = mkh

    // 开始进度条
    NProgress.start()

    //首页跳转
    if (to.name === 'home') {
      const { home } = store.state.app.config.site
      if (home) {
        return home
      }
    }

    //验证是否登录
    const { enablePermissionVerify } = to.meta
    if (enablePermissionVerify) {
      const { accessToken } = store.state.app.token
      if (!accessToken) {
        return '/login'
      }
      //加载个人信息
      if (!store.state.app.profile.accountId) {
        await store.dispatch('app/profile/init', null, { root: true })
      }
    }

    // 关闭进度条
    NProgress.done()
  })

  app.use(router)

  mkh.router = router
}
