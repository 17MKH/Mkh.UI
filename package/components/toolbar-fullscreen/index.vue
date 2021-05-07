<template>
  <div class="mu-toolbar_item">
    <mu-icon :name="state ? 'full-screen-exit' : 'full-screen'" @click="handleClick"></mu-icon>
  </div>
</template>
<script>
import { ref } from 'vue'
import screenfull from 'screenfull'
export default {
  name: 'ToolbarFullscreen',
  setup() {
    const state = ref(false)

    const handleClick = () => {
      if (screenfull.isFullscreen) {
        screenfull.exit()
        state.value = false
      } else {
        screenfull.request()
        state.value = true
      }
    }

    return {
      state,
      handleClick,
    }
  },
}
</script>
