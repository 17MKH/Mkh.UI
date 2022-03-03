<template>
  <el-breadcrumb class="m-breadcrumb" separator="/">
    <template v-for="(bc, i) in routeMenu.breadcrumb">
      <el-breadcrumb-item v-if="bc.to" :key="i" :to="{ name: bc.to }"> {{ bc.locales[$i18n.locale] }} </el-breadcrumb-item>
      <el-breadcrumb-item v-else :key="i + 1"> {{ bc.locales[$i18n.locale] }} </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const { store } = mkh
    const route = useRoute()

    const routeMenu = computed(() => {
      return store.state.app.profile.routeMenus.find(m => m.routeName === route.name)
    })

    return {
      routeMenu,
    }
  },
}
</script>
