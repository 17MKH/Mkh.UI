<template>
  <m-container>
    <m-doc-component-doc title="小盒子组件(m-box-small)" :props="props" :events="events" :methods="methods" :slots="slots">
      <m-doc-demo-block title="小盒子组件" :meta="code1">
        <template #desc> 小盒子组件常用于仪表盘或面板，用于展示数量统计信息 </template>
        <demo-1></demo-1>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import demo1 from './demos/1.vue'
import code1 from './demos/1.vue?raw'

import props from './apis/_props'
import events from './apis/_events'
import methods from './apis/_methods'
import slots from './apis/_slots'
export default {
  components: { demo1 },
  setup() {
    return {
      code1,
      props,
      events,
      methods,
      slots,
    }
  },
}
</script>
