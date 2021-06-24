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
import { useRouter } from 'vue-router'
export default {
  name: 'MenuItem',
  props: {
    menus: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const router = useRouter()

    const handleClick = menu => {
      router.push(menu.to)
    }

    return {
      handleClick,
    }
  },
}
</script>
