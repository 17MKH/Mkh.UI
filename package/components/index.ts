import type { App, Component } from 'vue'
import type { ModuleDefinition } from '@/types'
import AdvancedComponents from './advanced'
import BaseComponents from './base'
import FormComponents from './form'
import LayoutComponents from './layout'
import LoginComponents from './login'
import ToolbarComponents, { toolbars } from './toolbar'
import { useComponentStore } from '@/store'

const components = [...AdvancedComponents, ...BaseComponents, ...FormComponents, ...LayoutComponents, ...LoginComponents, ...ToolbarComponents]

const componentNames: string[] = []

const registerComponent = (app: App, name: string, component: Component) => {
  app.component(`m-${name}`, component)
  componentNames.push(`m-${name}`)
}

export default (app: App, modules: ModuleDefinition[]) => {
  const componentStore = useComponentStore()

  //框架中的全局组件
  components.forEach((m) => {
    registerComponent(app, m.name, m.component)
  })

  //模块中的全局组件
  modules.forEach((m) => {
    if (m.components) {
      m.components.forEach((c) => {
        let name = c.component.alias || c.name
        if (name.startsWith('login-')) {
          //登录组件与众不同~
        } else if (name.startsWith('toolbar-')) {
          //顶部工具栏组件
          let code = name.replace('toolbar-', '')
          toolbars.push({ code: code, label: c.component.label || code, show: true, sort: 0 })
        } else if (!c.component.alias) {
          name = `${m.code}-${name}`
        }

        registerComponent(app, name, c.component)
      })
    }
  })

  componentStore.toolbars = toolbars
  componentStore.components = componentNames
}

export * from './advanced'
export * from './base'
export * from './form'
export * from './layout'
