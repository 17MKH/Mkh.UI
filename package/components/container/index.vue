<template>
  <section class="m-container" :class="{ 'is-horizontal': horizontal }">
    <section class="m-container_main">
      <m-scrollbar v-if="scrollbar" ref="scrollbarRef" :horizontal="horizontal">
        <slot />
      </m-scrollbar>
      <slot v-else />
    </section>
  </section>
</template>
<script>
import { ref } from 'vue'
export default {
  props: {
    /** 滚动条 */
    scrollbar: {
      type: Boolean,
      default: false,
    },
    /** 是否显示水平滚动条 */
    horizontal: Boolean,
  },
  setup() {
    const scrollbarRef = ref()
    //更新滚动条
    const resizeScrollbar = () => {
      scrollbarRef.value.update()
    }

    return {
      scrollbarRef,
      resizeScrollbar,
    }
  },
}
</script>
