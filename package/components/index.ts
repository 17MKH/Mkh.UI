import type { App, Component } from 'vue'
import mkh from '@/mkh'
import AdvancedComponents from './advanced'
import BaseComponents from './base'
import FormComponents from './form'
import LayoutComponents from './layout'
import LoginComponents from './login'
import ToolbarComponents from './toolbar'

const components = [...AdvancedComponents, ...BaseComponents, ...FormComponents, ...LayoutComponents, ...LoginComponents, ...ToolbarComponents]

const registerComponent = (app: App, name: string, component: Component) => {
  app.component(`m-${name}`, component)
  mkh.components.push(name)
}

export default (app: App) => {
  //框架中的全局组件

  components.forEach((m) => {
    registerComponent(app, m.name, m.component)
  })

  //系统内置工具栏
  mkh.toolbars.lang = { code: 'lang', label: '多语言', show: true, sort: 0 }
  mkh.toolbars.skin = { code: 'skin', label: '皮肤', show: true, sort: 0 }
  mkh.toolbars.fullscreen = { code: 'fullscreen', label: '全屏', show: true, sort: 0 }

  //模块中的全局组件
  mkh.modules.forEach((m) => {
    if (m.components) {
      m.components.forEach((c) => {
        let name = c.name
        if (name.startsWith('login-')) {
          //登录组件与众不同~
        } else if (name.startsWith('toolbar-')) {
          //顶部工具栏组件
          let code = name.replace('toolbar-', '')
          mkh.toolbars[code] = { code: code, label: c.component.label || code, show: true, sort: 0 }
        } else {
          name = `${m.code}-${c.name}`
        }

        registerComponent(app, name, c.component)
      })
    }
  })
}
