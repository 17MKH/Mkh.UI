<template>
  <template v-for="menu in menus">
    <el-submenu v-if="menu.type === 0" :key="menu.id" :index="menu.id + ''">
      <template #title>
        <m-icon class="m-menu_item_icon" :name="menu.icon"></m-icon>
        <span>{{ menu.name }}</span>
      </template>
      <menu-item :menus="menu.children" />
    </el-submenu>
    <el-menu-item v-else :key="menu.id" :index="menu.id + ''" @click="handleClick(menu)">
      <m-icon class="m-menu_item_icon" :name="menu.icon"></m-icon>
      <span>{{ menu.name }}</span>
    </el-menu-item>
  </template>
</template>
<script>
import { router } from '../../router'
export default {
  name: 'MenuItem',
  props: {
    menus: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const handleClick = menu => {
      //路由菜单
      if (menu.type === 1) {
        //解析菜单对应的路由信息
        let { routeName: name, routeQuery, routeParams: params } = menu
        let query = routeQuery || {}
        //传递菜单编号
        query['_mid'] = menu.id

        router.push({ name, query, params })
      }
    }

    return {
      handleClick,
    }
  },
}
</script>
