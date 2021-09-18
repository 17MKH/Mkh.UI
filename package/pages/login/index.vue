<template>
  <div class="m-login-container">
    <component :is="`m-login-${loginComponent}`"></component>
  </div>
</template>
<script>
export default {
  setup() {
    const { store } = mkh

    return {
      loginComponent: store.state.app.config.component.login,
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
