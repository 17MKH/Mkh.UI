<template>
  <!--框架内显示-->
  <component :is="skinComponent" v-if="$route.meta.inFrame"></component>
  <!--不在框架中显示-->
  <router-view v-else />
</template>
<script>
import { computed, ref, watchEffect } from 'vue'
import { store } from './store'

export default {
  setup() {
    const skinComponent = ref('')
    const skin = computed(() => store.state.app.profile.skin)

    watchEffect(() => {
      skinComponent.value = `m-skin-${skin.value.code.toLowerCase()}`
      document.body.className = `${skinComponent.value} theme-${skin.value.theme}`
    })

    return {
      skinComponent,
    }
  },
}
</script>
