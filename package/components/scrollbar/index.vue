<template>
  <el-scrollbar ref="scrollbar" :class="['mu-scrollbar', horizontal ? 'is-horizontal' : '']">
    <slot />
  </el-scrollbar>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'Scrollbar',
  props: {
    /** 是否显示水平滚动条 */
    horizontal: Boolean,
  },
  setup() {
    const scrollbar = ref(null)

    // 重绘滚动条，某些场景下会用到该方法
    const update = () => {
      scrollbar.value.update()
    }

    return {
      scrollbar,
      update,
    }
  },
}
</script>
