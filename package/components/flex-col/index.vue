<template>
  <section :class="['m-flex-col', mode]">
    <slot />
  </section>
</template>
<script>
export default {
  name: 'FlexCol',
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
