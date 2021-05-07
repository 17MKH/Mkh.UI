<template>
  <el-breadcrumb class="mu-breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <template v-for="(bc, i) in list">
      <el-breadcrumb-item v-if="bc.to" :key="i" :to="bc.to"> {{ bc.label }} </el-breadcrumb-item>
      <el-breadcrumb-item v-else :key="i + 1"> {{ bc.label }} </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()

    const list = computed(() => {
      const { breadcrumbs, title, icon } = route.meta
      if (!breadcrumbs) {
        return [{ label: title, icon: icon }]
      }

      return [...breadcrumbs, { label: title, icon: icon }]
    })

    return {
      list,
    }
  },
}
</script>
