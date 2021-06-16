<template>
  <div class="m-wrapper">
    <m-header />
    <div class="m-sub-header">
      <!--菜单折叠-->
      <m-icon class="m-sub-header_menu" :name="menuCollapseIcon" @click="handleMeunCollapse" />
      <m-breadcrumb />
    </div>
    <m-main />
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MHeader from './components/header/index.vue'
import MMain from './components/main/index.vue'
export default {
  components: { MHeader, MMain },
  setup() {
    const store = useStore()
    const menuCollapseIcon = computed(() => (store.state.app.skin.brief.menuIsCollapse ? 'unfold' : 'fold'))

    const handleMeunCollapse = () => {
      store.commit('app/skin/brief/collapseMenu')
    }

    return {
      menuCollapseIcon,
      handleMeunCollapse,
    }
  },
}
</script>
<style lang="scss">
@import './styles/index.scss';
</style>
