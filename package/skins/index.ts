/** 导入内置皮肤 */
import { SkinDefinition } from '@/types'
import { App } from 'vue'
import './brief'

export default (app: App, skins: SkinDefinition[]) => {
  //注册皮肤
  skins.forEach((skin) => {
    // 注册组件
    app.component('m-skin-' + skin.code.toLowerCase(), skin.component)
  })
}
