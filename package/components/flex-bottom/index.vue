<template>
  <div class="m-flex-bottom" :style="{ height }">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FlexBottom',
  props: {
    height: {
      type: String,
      default: '',
    },
  },
}
</script>
