<template>
  <div class="m-toolbar_item" @click="handleClick">
    <m-icon :name="state ? 'full-screen-exit' : 'full-screen'"></m-icon>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import screenfull from 'screenfull'
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
</script>
