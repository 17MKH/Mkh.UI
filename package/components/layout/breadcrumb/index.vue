<template>
  <el-breadcrumb class="m-breadcrumb" separator="/">
    <template v-for="(bc, i) in routeMenu.breadcrumb">
      <el-breadcrumb-item v-if="bc.to" :key="i" :to="{ name: bc.to }"> {{ renderLabel(bc) }} </el-breadcrumb-item>
      <el-breadcrumb-item v-else :key="i + 1"> {{ renderLabel(bc) }} </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useProfileStore } from '@/store'
  import { Breadcrumb, Locales } from '@/types'
  import { useI18n } from '@/composables/i18n'

  const route = useRoute()

  const { locale } = useI18n()

  const profileStore = useProfileStore()

  const routeMenu = computed(() => {
    let r = profileStore.routeMenus.find((m) => m.routeName === route.name)
    if (!r || route.name === 'home') {
      return {
        breadcrumb: [{ to: 'home', locales: { 'zh-cn': '首页', en: 'Home' } }],
      }
    }

    return r
  })

  const renderLabel = (bc: Breadcrumb) => {
    if (bc.locales) {
      return bc.locales[locale.value] || 'Menu no name'
    }
    return 'Menu no name'
  }
</script>
<style lang="scss">
  @import './index';
</style>
