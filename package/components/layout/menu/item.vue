<template>
  <template v-for="menu in menus">
    <el-sub-menu v-if="menu.type === 0" :key="menu.id" popper-class="m-menu_popper" :index="menu.id + ''">
      <template #title>
        <m-icon class="m-menu_item_icon" :name="menu.icon"></m-icon>
        <span>{{ renderLabel(menu) }}</span>
      </template>
      <menu-item :menus="menu.children" />
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
  import { Menu } from '@/types'
  import { useI18n } from '@/composables/i18n'
  import { useRouter } from 'vue-router'

  const { t, locale } = useI18n()

  const props = defineProps({
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
      let { routeName: name, routeQuery, routeParams: params } = menu
      let query = routeQuery || { _mid_: '' }
      //传递菜单编号
      query['_mid_'] = menu.id

      router.push({ name, query, params })
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
