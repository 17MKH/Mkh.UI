import type { Ref } from 'vue'
import { ref } from 'vue'

export default function (emit: { (e: 'collapse-change', isCollapse: Ref<boolean>): void }) {
  const isCollapse = ref(false)

  const openCollapse = () => {
    isCollapse.value = false
    emit('collapse-change', isCollapse)
  }

  const closeCollapse = () => {
    isCollapse.value = true
    emit('collapse-change', isCollapse)
  }

  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
    emit('collapse-change', isCollapse)
  }

  return {
    isCollapse,
    openCollapse,
    closeCollapse,
    toggleCollapse,
  }
}
