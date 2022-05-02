<template>
  <header :class="['m-head', size_]">
    <div v-if="icon" class="m-head_icon">
      <m-icon :name="icon" :style="{ color: iconColor || '' }" />
    </div>
    <div class="m-head_title">
      <slot>{{ title }}</slot>
    </div>
    <div v-if="$slots.toolbar" class="m-head_toolbar">
      <slot name="toolbar"></slot>
    </div>
  </header>
</template>
<script>
import { computed } from 'vue'
import props from './props'
export default {
  props,
  setup(props) {
    const { store } = mkh

    return {
      size_: computed(() => props.size || store.state.app.profile.skin.size),
    }
  },
}
</script>
