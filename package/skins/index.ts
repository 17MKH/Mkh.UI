/** 导入内置皮肤 */
import { SkinDefinition } from '@/types'
import { App } from 'vue'
import briefSkin from './brief'
import { useSkinStore } from '@/store'

export default (app: App, skins: SkinDefinition[]) => {
  //内置皮肤
  skins.push(briefSkin)

  //注册皮肤
  skins.forEach((skin) => {
    // 注册组件
    app.component('m-skin-' + skin.code.toLowerCase(), skin.component)
  })

  const skinStore = useSkinStore()
  skinStore.skins = skins
}
