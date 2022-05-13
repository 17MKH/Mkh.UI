const components = import.meta.globEager('./**/index.vue')
export default app => {
  //框架中的全局组件

  Object.keys(components).forEach(key => {
    const comName = key.split('/')[1]

    const component = components[key].default

    const name = `m-${comName}`
    app.component(name, component)
    mkh.components.push(comName)
  })

  //系统内置工具栏
  mkh.toolbars.lang = { code: 'lang', label: '多语言', show: true, srot: 0 }
  mkh.toolbars.skin = { code: 'skin', label: '皮肤', show: true, srot: 0 }
  mkh.toolbars.fullscreen = { code: 'fullscreen', label: '全屏', show: true, sort: 0 }

  //模块中的全局组件
  mkh.modules.forEach(m => {
    if (m.components) {
      m.components.forEach(c => {
        if (c.name.startsWith('login-')) {
          //登录组件与众不同~
          app.component(`m-${c.name}`, c.component)
          mkh.components.push(`m-${c.name}`)
        } else if (c.name.startsWith('toolbar-')) {
          //顶部工具栏组件
          let code = c.name.replace('toolbar-', '')
          app.component(`m-${c.name}`, c.component)
          mkh.toolbars[code] = { code: code, label: c.component.label || code, show: true, sort: 0 }
          mkh.components.push(`m-${c.name}`)
        } else {
          app.component(`m-${m.code}-${c.name}`, c.component)
          mkh.components.push(`m-${m.code}-${c.name}`)
        }
      })
    }
  })

  if (mkh.components_) {
    mkh.components_.forEach(m => {
      app.component(`m-${m.name}`, m.component)
      mkh.components.push(`m-${m.name}`)
    })

    delete mkh.components_
  }
}
