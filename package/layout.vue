<template>
  <!--框架内显示-->
  <component :is="skinCode" v-if="$route.meta.inFrame"></component>
  <!--不在框架中显示-->
  <router-view v-else />
</template>
<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    const skinCode = computed(() => {
      return `m-skin-${store.state.app.skin.code.toLowerCase()}`
    })

    //给body附加皮肤class
    const app = () => {
      document.body.className = `${skinCode.value} theme-${store.state.app.skin.theme}`
    }

    app()

    //监听皮肤切换
    watch(skinCode, app)

    return {
      skinCode,
    }
  },
}
</script>
