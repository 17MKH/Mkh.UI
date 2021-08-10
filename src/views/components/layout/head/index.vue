<template>
  <m-container>
    <m-doc-component-doc title="头部组件(m-head)" :props="props" :slots="slots">
      <m-doc-demo-block title="简单用法" :meta="code1">
        <template #desc>
          <p>头部组件是一个简单的布局组件，常用于左侧图标、中间标题、右侧功能栏的场景，如<code>m-box</code>、<code>m-dialog</code>、<code>m-list</code>等组件都用到了该组件。</p>
          <p>提供了四种尺寸</p>
        </template>
        <demo-1 />
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from './apis/_props'
import slots from './apis/_slots'
import demo1 from './demos/1.vue'
import code1 from './demos/1.vue?raw'

export default {
  components: { demo1 },
  setup() {
    return {
      props,
      slots,
      code1,
    }
  },
}
</script>
