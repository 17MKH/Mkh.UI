<template>
  <div class="m-login-container">
    <component :is="`m-login-${loginComponent}`"></component>
  </div>
</template>
<script>
export default {
  setup() {
    return {
      loginComponent: mkh.config.component.login,
    }
  },
}
</script>
<style lang="scss">
.m-login-container {
  position: relative;
  width: 100%;
  min-height: 100%;
}
</style>
