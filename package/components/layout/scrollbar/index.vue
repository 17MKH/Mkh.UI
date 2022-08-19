<template>
  <el-scrollbar ref="scrollbar" :class="['m-scrollbar', horizontal ? 'is-horizontal' : '']">
    <slot></slot>
  </el-scrollbar>
</template>
<script setup lang="ts">
  import type { ElScrollbar } from 'element-plus'
  import { ref } from 'vue'

  defineProps({
    /** 是否显示水平滚动条 */
    horizontal: Boolean,
  })

  const scrollbar = ref<InstanceType<typeof ElScrollbar>>()

  // 重绘滚动条，某些场景下会用到该方法
  const update = () => {
    scrollbar.value!.update()
  }

  defineExpose({
    update,
  })
</script>
<style lang="scss">
  @import './index';
</style>
