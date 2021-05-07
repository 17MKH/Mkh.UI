import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '../store'
import NProgress from 'nprogress'
import routes from './routes'
import defaultPage from '../pages/default/index.vue'

// 进度条初始值
NProgress.configure({ minimum: 0.2 })

let router = null

/**
 * @description 页面转路由
 */
const page2route = (page, parentRoute, pages) => {
  /**********************************************
   * 页面属性与路由属性对应关系以及说明
   **********************************************
   * title                页面默认标题，也是菜单默认名称
   * icon                 页面默认图标，也是菜单默认图标
   * path                 路由地址
   * name                 路由名称
   * component            路由对应组件
   * noFrame              页面不在框架中显示，有些页面可能是独立的，比如登陆页面，则该属性需要设置为true
   * noPermissionValidate 不需要权限验证
   * permissions          页面绑定的权限列表
   * buttons              页面绑定的按钮信息
   * breadcrumbs          页面的面包屑信息
   * cache                页面是否缓存，路由的keep-alive特性
   * props                路由启用props特性
   */
  const { title, icon, path, name, component, noFrame, noPermissionValidate, permissions, buttons, breadcrumbs, cache, props } = page
  const route = {
    path,
    name,
    component,
    props,
    meta: {
      title,
      icon,
      buttons,
      permissions,
      breadcrumbs,
      cache,
      noFrame: typeof noFrame === 'undefined' || noFrame === null ? false : noFrame,
      noPermissionValidate,
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
}

/**
 * @description 配置默认页，如果用户设置了默认页，则将默认页对应的路由别名设置为'/'，如果没有则添加系统默认页
 */
const handleDefaultPage = () => {
  const { defaultPage } = MkhUI.config.site
  let noDefaultPage = true
  if (defaultPage) {
    //根据路由名称查找路由信息
    let defaultRoute = routes.find(m => m.name === defaultPage)
    if (defaultRoute) {
      defaultRoute.alias = '/'
      noDefaultPage = false
    }
  }

  //如果未设置默认页，则使用系统自带的默认页并将path设置为'/'
  if (noDefaultPage) {
    routes[0].path = '/'
  }
}

export default (app, modules) => {
  //页面转换路由
  modules
    .filter(m => m.pages)
    .forEach(m => {
      m.pages
        .filter(p => !p.parent)
        .forEach(p => {
          page2route(p, null, m.pages)
        })
    })

  //处理默认页
  handleDefaultPage()

  //创建路由实例
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  router.beforeEach((to, from) => {
    // 开始进度条
    NProgress.start()

    //验证下是否登录
    const { noPermissionValidate } = to.meta
    const { accessToken } = store.state.app.token
    if (!noPermissionValidate && !accessToken) {
      return '/login'
    }

    store.dispatch('app/page/open', to, { root: true })

    // 关闭进度条
    NProgress.done()
  })

  app.use(router)
}

export { router }
