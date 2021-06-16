import has from './has'

const directives = [has]

export default app => {
  directives.forEach(m => {
    app.directive(`M${m.name}`, m.directive)
  })
}
