<template>
  <el-config-provider :locale="$i18n.messages[$i18n.locale]" :size="size">
    <!--框架内显示-->
    <component :is="skinComponent" v-if="$route.meta.inFrame"></component>
    <!--不在框架中显示-->
    <router-view v-else />
  </el-config-provider>
</template>
<script>
import { computed, ref, watchEffect } from 'vue'
import useSize from './composables/size'
export default {
  setup() {
    const { size } = useSize()

    const skinComponent = ref('')
    const skin = computed(() => mkh.store.state.app.profile.skin)

    watchEffect(() => {
      skinComponent.value = `m-skin-${skin.value.code.toLowerCase()}`
      document.body.className = `${skinComponent.value} theme-${skin.value.theme}`
    })

    return {
      size,
      skinComponent,
    }
  },
}
</script>
