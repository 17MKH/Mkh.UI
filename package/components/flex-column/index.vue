<template>
  <section :class="['mu-flex-column', mode]">
    <slot />
  </section>
</template>
<script>
export default {
  name: 'Flex',
  props: {
    /**
     * 固定模式，top是顶部固定，右边响应式，bottom反之
     */
    mode: {
      type: String,
      validator(value) {
        return ['top', 'bottom'].includes(value)
      },
      default: 'top',
    },
  },
}
</script>
