<template>
  <div class="m-login-container">
    <component :is="`m-login-${configSotre.component.login}`"></component>
  </div>
</template>
<script setup lang="ts">
  import { useConfigStore } from '@/store'
  const configSotre = useConfigStore()
</script>
<style lang="scss">
  .m-login-container {
    position: relative;
    width: 100%;
    min-height: 100%;
  }
</style>
