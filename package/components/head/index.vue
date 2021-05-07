<template>
  <header :class="['mu-head', size_]">
    <div v-if="icon" class="mu-head_icon">
      <mu-icon :name="icon" :style="{ color: iconColor || '' }" />
    </div>
    <div class="mu-head_title">
      <slot>{{ title }}</slot>
    </div>
    <div v-if="$slots.toolbar" class="mu-head_toolbar">
      <slot name="toolbar"></slot>
    </div>
  </header>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Head',
  props: {
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const store = useStore()

    return {
      size_: computed(() => props.size || store.state.app.account.skin.size),
    }
  },
}
</script>
