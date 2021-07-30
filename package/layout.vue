<template>
  <!--框架内显示-->
  <component :is="skinComponent" v-if="$route.meta.inFrame"></component>
  <!--不在框架中显示-->
  <router-view v-else />
</template>
<script>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const skinComponent = ref('')

    watchEffect(() => {
      const { skin } = store.state.app
      skinComponent.value = `m-skin-${skin.code.toLowerCase()}`
      document.body.className = `${skinComponent.value} theme-${skin.theme}`
    })

    return {
      skinComponent,
    }
  },
}
</script>
