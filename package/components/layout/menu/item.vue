<template>
  <template v-for="menu in (menus as Menu[])">
    <el-sub-menu v-if="menu.type === 0" :key="menu.id" popper-class="m-menu_popper" :index="menu.id + ''">
      <template #title>
        <m-icon class="m-menu_item_icon" :name="menu.icon"></m-icon>
        <span>{{ renderLabel(menu) }}</span>
      </template>
      <item v-if="menu.children" :menus="menu.children" />
    </el-sub-menu>
    <template v-else>
      <el-menu-item :key="menu.id" :index="menu.id + ''" @click="handleClick(menu)">
        <m-icon class="m-menu_item_icon" :name="menu.icon"></m-icon>
        <span>{{ renderLabel(menu) }}</span>
      </el-menu-item>
    </template>
  </template>
</template>
<script setup lang="ts">
  import Item from './item.vue'
  import { Menu } from '@/types'
  import { useI18n } from '@/composables/i18n'
  import { RouteLocationRaw, useRouter } from 'vue-router'

  const { t, locale } = useI18n()

  defineProps({
    menus: {
      type: Array,
      required: true,
    },
  })

  const router = useRouter()

  const handleClick = (menu: Menu) => {
    //路由菜单
    if (menu.type === 1) {
      //解析菜单对应的路由信息
      let { routeName: name, routeQuery, routeParams } = menu
      let query: { _mid_: string | number } = { _mid_: '' }

      if (routeQuery) {
        query = JSON.parse(routeQuery)
      }

      //传递菜单编号
      query['_mid_'] = menu.id

      let route: RouteLocationRaw = {
        name,
        query,
      }

      if (routeParams) {
        route.params = JSON.parse(routeParams)
      }

      router.push(route)
    }
  }

  const renderLabel = (menu: Menu) => {
    if (menu.locales) {
      return menu.locales[locale.value] || 'Menu no name'
    } else {
      if (menu.type === 1) {
        return t('mkh.routes.' + menu.routeName)
      } else {
        return 'Menu no name'
      }
    }
  }
</script>
