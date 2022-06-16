<template>
  <el-breadcrumb class="m-breadcrumb" separator="/">
    <template v-for="(bc, i) in routeMenu.breadcrumb">
      <el-breadcrumb-item v-if="bc.to" :key="i" :to="{ name: bc.to }"> {{ renderLabel(bc) }} </el-breadcrumb-item>
      <el-breadcrumb-item v-else :key="i + 1"> {{ renderLabel(bc) }} </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
import { getCurrentInstance, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const cit = getCurrentInstance().proxy
    const { store } = mkh
    const route = useRoute()

    const routeMenu = computed(() => {
      let r = store.state.app.profile.routeMenus.find(m => m.routeName === route.name)
      if (!r || route.name === 'home') {
        return {
          breadcrumb: [{ to: 'home', locales: { 'zh-cn': '首页', en: 'Home' } }],
        }
      }

      return r
    })

    const renderLabel = bc => {
      if (bc.locales) {
        return bc.locales[cit.$i18n.locale] || 'Menu no name'
      }
      return 'Menu no name'
    }

    return {
      routeMenu,
      renderLabel,
    }
  },
}
</script>
