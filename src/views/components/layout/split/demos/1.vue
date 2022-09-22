<template>
  <div>当前值:{{ value }}</div>
  <div style="height: 200px">
    <m-split v-model="value">
      <template #fixed>
        <div class="demo"></div>
      </template>
      <template #auto>
        <div class="demo"></div>
      </template>
    </m-split>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(0.3)
</script>
<style lang="scss" scoped>
  .demo {
    height: 100%;
    background: #ebeef5;
  }
</style>
