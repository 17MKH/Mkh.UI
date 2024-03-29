import type { size } from '@/types'
import { computed } from 'vue'
import { SIZE_DEFINITIONS } from '../utils/constants'
import { useConfigStore } from '@/store'

export const useSize = function (props?: { size: size }) {
  return computed(() => {
    let size = SIZE_DEFINITIONS.DEFAULT
    if (props && props.size) {
      size = props.size
    }
    const configStore = useConfigStore()
    return Object.values(SIZE_DEFINITIONS).find((m) => m === (size || configStore.skin.size)) || SIZE_DEFINITIONS.DEFAULT
  })
}
