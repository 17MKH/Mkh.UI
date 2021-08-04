<template>
  <div :class="['m-menu', isCollapse ? 'is-collapse' : '']">
    <m-scrollbar horizontal>
      <el-menu :default-active="defaultActive" class="m-menu_wrapper" :collapse="isCollapse"> <menu-item :menus="menus" /> </el-menu>
    </m-scrollbar>
  </div>
</template>
<script>
import { computed } from 'vue'
import { store } from '../../store'
import MenuItem from './item.vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Menu',
  components: { MenuItem },
  setup() {
    const route = useRoute()

    const defaultActive = computed(() => {
      const { _mid } = route.query
      if (_mid) return _mid + ''

      return '-1'
    })

    return {
      defaultActive,
      menus: computed(() => store.state.app.profile.menus),
      isCollapse: computed(() => store.state.app.skin.brief.menuIsCollapse),
    }
  },
}
</script>
