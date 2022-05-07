import { useStore } from 'vuex'
import { computed } from 'vue'

export default function () {
  const store = useStore()
  const sizeList = ['large', 'default', 'small']
  const sizeMap = {
    LARGE: 'large',
    DEFAULT: 'default',
    SMALL: 'small',
  }
  const componentSizeMap = {
    large: 40,
    default: 32,
    small: 24,
  }
  const getSize = size => {
    return sizeList.includes(size) ? size : 'default'
  }
  const appFontSize = computed(() => getSize(store.state.app.profile.skin.size))
  return {
    appFontSize,
    sizeMap,
    componentSizeMap,
  }
}
