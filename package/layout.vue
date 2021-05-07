<template>
  <!--不在框架中显示-->
  <router-view v-if="noFrame" />
  <!--框架内显示-->
  <component :is="skinCode" v-else></component>
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
      return `mu-skin-${store.state.app.skin.code.toLowerCase()}`
    })

    //给body附加皮肤class
    const app = () => {
      document.body.className = `${skinCode.value} theme-${store.state.app.skin.theme}`
    }

    app()

    //监听皮肤切换
    watch(skinCode, app)

    const noFrame = computed(() => {
      //初始化时noFrame是undefined，需要设置为不在框架内显示，否则会导致先显示布局页面再显示当前路由页面的问题
      //比如登录页面会先看到框架皮肤页面，再看到登录页
      if (typeof route.meta.noFrame === 'undefined') return true
      return route.meta.noFrame
    })

    return {
      skinCode,
      noFrame,
    }
  },
}
</script>
