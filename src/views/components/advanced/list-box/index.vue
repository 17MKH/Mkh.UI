<template>
  <m-container>
    <m-doc-component-doc title="列表盒子组件(m-list-box)" :props="props" :events="events" :methods="methods" :slots="slots">
      <m-doc-demo-block title="列表盒子" :meta="code1">
        <template #desc> </template>
        <demo-1></demo-1>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from './_props'
import events from './_events'
import methods from './_methods'
import slots from './_slots'
import demo1 from './demos/1.vue'
import code1 from './demos/1.vue?raw'
export default {
  components: { demo1 },
  setup() {
    return {
      props,
      events,
      methods,
      slots,
      code1,
    }
  },
}
</script>
