// 按钮权限指令
import { Directive } from 'vue'
import { useConfigStore, useProfileStore } from '@/store'
import { useRouter } from 'vue-router'

const directive: Directive = {
  mounted: (el: HTMLImageElement, binding) => {
    const code = binding.value
    // 如果编码为空则始终显示
    if (!code) return

    const configStore = useConfigStore()
    // 验证是否开启按钮验证，按钮编码不区分大小写
    if (configStore.auth.enableButtonPermissions) {
      const router = useRouter()
      const currentRoute = router.currentRoute.value
      let { _mid_ } = currentRoute.query

      const profileStore = useProfileStore()
      if (!_mid_) {
        const menu = profileStore.routeMenus.find((m) => m.routeName === currentRoute.name)
        if (menu) {
          _mid_ = menu.id
        }
      }
      const { buttons } = profileStore
      const buttonCode = `${_mid_}_${code.toLowerCase()}`
      if (buttons && buttons.every((c) => c.toLowerCase() !== buttonCode) && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  },
}

export default {
  name: 'Has',
  directive,
}
