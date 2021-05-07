<template>
  <div class="mu-flex-right" :style="{ width }">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FlexRight',
  props: {
    width: {
      type: String,
      default: '',
    },
  },
}
</script>
