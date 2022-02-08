<template>
  <div :class="['m-menu', collapse ? 'is-collapse' : '']">
    <m-scrollbar horizontal>
      <el-menu :default-active="defaultActive" class="m-menu_wrapper" :collapse="collapse"> <menu-item :menus="menus" /> </el-menu>
    </m-scrollbar>
  </div>
</template>
<script>
import { computed } from 'vue'
import MenuItem from './item.vue'
import { useRoute } from 'vue-router'
export default {
  components: { MenuItem },
  props: {
    /** 折叠 */
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { store } = mkh

    const route = useRoute()

    const defaultActive = computed(() => {
      const { _mid_ } = route.query
      if (_mid_) return _mid_ + ''

      //如果不存在_mid_参数，则通过路由名称匹配第一个菜单
      const menu = store.state.app.profile.routeMenus.find(m => m.routeName === route.name)
      if (menu) return menu.id + ''

      return '-1'
    })

    return {
      defaultActive,
      menus: computed(() => store.state.app.profile.menus),
    }
  },
}
</script>
