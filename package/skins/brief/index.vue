<template>
  <div class="m-wrapper">
    <m-header />
    <div class="m-sub-header">
      <!--菜单折叠-->
      <m-icon class="m-sub-header_menu" :name="store.menuIsCollapse ? 'unfold' : 'fold'" @click="handleMeunCollapse" />
      <m-breadcrumb />
      <div v-show="showGoBack" class="m-back">
        <el-link type="primary" @click="goBack"
          ><m-icon name="arrow-left" /> <span>{{ $t('mkh.back') }}</span></el-link
        >
      </div>
    </div>
    <m-main />
  </div>
</template>
<script setup lang="ts">
  import { computed } from '@vue/runtime-core'
  import MHeader from './components/header/index.vue'
  import MMain from './components/main/index.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useConfigStore } from '@/store'
  import { useStore } from './store'

  const store = useStore()
  const configStore = useConfigStore()
  const route = useRoute()
  const router = useRouter()

  const showGoBack = computed(() => {
    return route.name !== 'home' && route.path !== configStore.site.homePage
  })

  const handleMeunCollapse = () => {
    store.toggleMenuCollapse()
  }

  const goBack = () => {
    router.back()
  }
</script>
<style lang="scss">
  @import './styles/index.scss';
</style>
