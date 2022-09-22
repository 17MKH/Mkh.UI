import { App } from 'vue'
import has from './has'

const directives = [has]

export default (app: App) => {
  directives.forEach((m) => {
    app.directive(`M${m.name}`, m.directive)
  })
}
