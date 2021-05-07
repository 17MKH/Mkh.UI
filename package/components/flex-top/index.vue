<template>
  <div class="mu-flex-top" :style="{ height }">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FlexTop',
  props: {
    height: {
      type: String,
      default: '',
    },
  },
}
</script>
