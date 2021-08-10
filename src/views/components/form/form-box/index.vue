<template>
  <m-container>
    <m-doc-component-doc title="表单组件(m-form)" :props="props" :events="events" :methods="methods" :slots="slots">
      <m-doc-demo-block title="盒子表单" :meta="code1">
        <template #desc>
          <p>盒子表单与对话框表单类似，只不过盒子表单是使用<code>m-box</code>和<code>m-form</code>一起封装。</p>
        </template>
        <demo-1 />
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from './apis/_props'
import events from './apis/_events'
import methods from './apis/_methods'
import slots from './apis/_slots'
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
