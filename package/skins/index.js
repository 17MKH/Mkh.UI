/** 导入内置皮肤 */
import './brief'

export default app => {
  //注册皮肤
  mkh.skins.forEach(skin => {
    // 注册组件
    app.component('m-skin-' + skin.code.toLowerCase(), skin.component)

    // 注册状态
    if (skin.store) {
      mkh.store.registerModule(['skin', skin.code], skin.store)
    }
  })
}
