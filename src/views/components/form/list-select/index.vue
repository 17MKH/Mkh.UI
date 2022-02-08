<template>
  <m-container>
    <m-doc-component-doc title="列表选择(m-select)" :props="props">
      <m-doc-demo-block title="简单用法" :meta="code">
        <template #desc> </template>
        <demo></demo>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from './apis/_props'
import demo from './demos/1.vue'
import code from './demos/1.vue?raw'
export default {
  components: { demo },
  setup() {
    return {
      props,
      code,
    }
  },
}
</script>
