<template>
  <div :class="['m-menu', isCollapse ? 'is-collapse' : '']">
    <m-scrollbar horizontal>
      <el-menu :default-active="defaultActive" class="m-menu_wrapper" :collapse="isCollapse"> <menu-item :menus="menus" /> </el-menu>
    </m-scrollbar>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MenuItem from './item.vue'
export default {
  name: 'Menu',
  components: { MenuItem },
  setup() {
    const store = useStore()

    const defaultActive = computed(() => {
      const { routeMenus } = store.state.app.profile
      const { current } = store.state.app.page
      if (current.fullPath && routeMenus) {
        let routeMenu = routeMenus.get(current.fullPath)
        if (routeMenu) {
          return routeMenu.id + ''
        }
      }
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
