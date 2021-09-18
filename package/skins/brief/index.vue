<template>
  <div class="m-wrapper">
    <m-header />
    <div class="m-sub-header">
      <!--菜单折叠-->
      <m-icon class="m-sub-header_menu" :name="$store.state.skin.brief.menuIsCollapse ? 'unfold' : 'fold'" @click="handleMeunCollapse" />
      <m-breadcrumb />
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
    const { store } = mkh

    const handleMeunCollapse = () => {
      store.commit('skin/brief/toggleMenuCollapse')
    }

    return {
      handleMeunCollapse,
    }
  },
}
</script>
<style lang="scss">
@import './styles/index.scss';
</style>
