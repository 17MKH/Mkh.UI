import { store } from '../store'
/** 导入内置皮肤 */
import './brief'
import './youthful'

export default app => {
  //注册皮肤
  MkhUI.skins.forEach(skin => {
    // 注册组件
    app.component('m-skin-' + skin.code.toLowerCase(), skin.component)

    // 注册状态
    if (skin.store) {
      store.registerModule(['app', 'skin', skin.code], skin.store)
    }
  })
}
