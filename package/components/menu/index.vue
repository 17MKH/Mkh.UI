<template>
  <div :class="['mu-menu', isCollapse ? 'is-collapse' : '']">
    <mu-scrollbar horizontal>
      <el-menu :default-active="defaultActive" class="mu-menu_wrapper" :collapse="isCollapse"> <menu-item :menus="menus" /> </el-menu>
    </mu-scrollbar>
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
    const { routeMenus, menus } = store.state.app.account

    const defaultActive = computed(() => {
      const { current } = store.state.app.page
      if (current.fullPath && routeMenus) {
        let routeMenu = routeMenus.get(current.fullPath)
        if (routeMenu) {
          return routeMenu.id
        }
      }
      return '-1'
    })

    return {
      defaultActive,
      menus,
      isCollapse: computed(() => store.state.app.skin.brief.menuIsCollapse),
    }
  },
}
</script>
