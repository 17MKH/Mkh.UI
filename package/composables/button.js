import { useStore } from 'vuex'

export default function () {
  const store = useStore()

  //验证是否有指定按钮编码的权限
  const hasButton = code => {
    //如果未启用按钮权限验证，则使用返回true
    if (!MkhUI.config.auth.enableButtonPermissions) {
      return true
    }

    return !store.state.app.account.buttons.every(c => c.toLowerCase() !== code.toLowerCase())
  }

  return {
    hasButton,
  }
}
