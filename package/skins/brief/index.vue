<template>
  <div class="m-wrapper">
    <m-header />
    <div class="m-sub-header">
      <!--菜单折叠-->
      <m-icon class="m-sub-header_menu" :name="$store.state.skin.brief.menuIsCollapse ? 'unfold' : 'fold'" @click="handleMeunCollapse" />
      <m-breadcrumb />
      <div class="m-back">
        <el-link type="primary" @click="goBack"
          ><m-icon name="arrow-left" /> <span>{{ $t('mkh.back') }}</span></el-link
        >
      </div>
    </div>
    <m-main />
  </div>
</template>
<script>
import MHeader from './components/header/index.vue'
import MMain from './components/main/index.vue'
export default {
  components: { MHeader, MMain },
  setup() {
    const { store, router } = mkh

    const handleMeunCollapse = () => {
      store.commit('skin/brief/toggleMenuCollapse')
    }

    const goBack = () => {
      router.back()
    }

    return {
      handleMeunCollapse,
      goBack,
    }
  },
}
</script>
<style lang="scss">
@import './styles/index.scss';
</style>
