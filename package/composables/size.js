import { computed } from 'vue'
import { SIZE_DEFINITIONS } from '../utils/constants'

export default function (props) {
  return {
    size: computed(() => {
      if (!props) {
        props = { size: null }
      }
      return Object.values(SIZE_DEFINITIONS).find(m => m === (props.size || mkh.store.state.app.profile.skin.size)) || SIZE_DEFINITIONS.DEFAULT
    }),
  }
}
