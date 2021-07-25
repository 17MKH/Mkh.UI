import { router } from '../router'
import { store } from '../store'

// 按钮权限指令
export default {
  name: 'Has',
  directive: {
    mounted: (el, binding) => {
      const code = binding.value
      // 如果编码为空则始终显示
      if (!code) return
      // 验证是否开启按钮验证，按钮编码不区分大小写
      if (mkh.config.auth.enableButtonPermissions) {
        const { _mid } = router.currentRoute.value.query
        const { buttons } = store.state.app.profile
        const buttonCode = `${_mid}_${code.toLowerCase()}`

        if (buttons && buttons.every(c => c.toLowerCase() !== buttonCode)) {
          el.parentNode.removeChild(el)
        }
      }
    },
  },
}
