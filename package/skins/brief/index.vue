<template>
  <div class="mu-wrapper">
    <mu-header />
    <div class="mu-sub-header">
      <!--菜单折叠-->
      <mu-icon class="mu-sub-header_menu" :name="menuCollapseIcon" @click="handleMeunCollapse" />
      <mu-breadcrumb />
    </div>
    <mu-main />
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MuHeader from './components/header/index.vue'
import MuMain from './components/main/index.vue'
export default {
  components: { MuHeader, MuMain },
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
