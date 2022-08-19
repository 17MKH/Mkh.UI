<template>
  <div class="m-flex-fixed" :style="{ width, height }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  defineProps({
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
  })
</script>
