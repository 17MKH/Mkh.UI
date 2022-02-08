<template>
  <el-breadcrumb class="m-breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">{{ $t('mkh.home') }}</el-breadcrumb-item>
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
  setup() {
    const route = useRoute()

    const list = computed(() => {
      const { breadcrumbs, title, icon } = route.meta
      console.log(route)
      if (!breadcrumbs && !title) return []

      const last = { label: title, icon: icon }
      if (!breadcrumbs) {
        return [last]
      }

      return [...breadcrumbs, last]
    })

    return {
      list,
    }
  },
}
</script>
