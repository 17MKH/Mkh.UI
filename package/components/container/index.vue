<template>
  <section class="mu-container" :class="{ 'is-horizontal': horizontal }">
    <section class="mu-container_main">
      <mu-scrollbar v-if="scrollbar" ref="scrollbarRef" :horizontal="horizontal">
        <slot />
      </mu-scrollbar>
      <slot v-else />
    </section>
  </section>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'Container',
  props: {
    /** 滚动条 */
    scrollbar: Boolean,
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
