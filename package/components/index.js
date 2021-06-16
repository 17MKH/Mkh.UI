const components = import.meta.globEager('./**/index.vue')

export default app => {
  Object.values(components).forEach(m => {
    const component = m.default
    app.component(`M${component.name}`, component)
  })
}
