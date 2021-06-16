<template>
  <div class="m-toolbar_item">
    <m-icon :name="state ? 'full-screen-exit' : 'full-screen'" @click="handleClick"></m-icon>
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
