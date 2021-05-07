<template>
  <div class="mu-flex-left" :style="{ width }">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FlexLeft',
  props: {
    width: {
      type: String,
      default: '',
    },
  },
}
</script>
