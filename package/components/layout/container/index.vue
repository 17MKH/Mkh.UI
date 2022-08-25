<template>
  <section class="m-container" :class="{ 'is-horizontal': horizontal }">
    <section class="m-container_main">
      <m-scrollbar v-if="scrollbar" ref="scrollbarRef" :horizontal="horizontal">
        <slot></slot>
      </m-scrollbar>
      <slot v-else></slot>
    </section>
  </section>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  defineProps({
    /** 滚动条 */
    scrollbar: {
      type: Boolean,
      default: false,
    },
    /** 是否显示水平滚动条 */
    horizontal: Boolean,
  })

  const scrollbarRef = ref()

  //更新滚动条
  const resizeScrollbar = () => {
    scrollbarRef.value.update()
  }

  defineExpose({ resizeScrollbar })
</script>
