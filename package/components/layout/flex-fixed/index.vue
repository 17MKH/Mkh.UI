<template>
  <div class="m-flex-fixed" :style="{ width, height }">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
  },
}
</script>
