const components = import.meta.globEager('./**/index.vue')

export default app => {
  //框架中的全局组件
  Object.values(components).forEach(m => {
    const component = m.default
    app.component(`M${component.name}`, component)
  })

  //模块中的全局组件
  mkh.modules.forEach(m => {
    if (m.components) {
      m.components.forEach(c => {
        //登录组件与众不同~
        if (c.name.startsWith('login-')) {
          app.component(`m-${c.name}`, c.component)
        } else {
          app.component(`m-${m.code}-${c.name}`, c.component)
        }
      })
    }
  })
}
