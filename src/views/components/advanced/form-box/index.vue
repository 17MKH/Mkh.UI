<template>
  <mu-container>
    <mu-doc-component-doc title="表单组件(mu-form)" :props="props" :events="events" :methods="methods" :slots="slots">
      <mu-doc-demo-block title="盒子表单" :meta="code1">
        <template #desc>
          <p>盒子表单与对话框表单类似，只不过盒子表单是使用<code>mu-box</code>和<code>mu-form</code>一起封装。</p>
        </template>
        <demo-1 />
      </mu-doc-demo-block>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import props from './_props'
import events from './_events'
import methods from './_methods'
import slots from './_slots'
import demo1 from './demos/1.vue'
import code1 from '!./demos/1.vue'
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
