<template>
  <mu-container>
    <mu-doc-component-doc title="表单组件(mu-form)" :props="props" :events="events" :methods="methods" :slots="slots">
      <mu-doc-demo-block title="对话框表单" :meta="code1">
        <template #desc>
          <p>对话框表单使用<code>mu-dialog</code>和<code>mu-form</code>一起封装的对话框形式的表单组件，用户只需要关注表单所需的action以及业务控件即可。</p>
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
