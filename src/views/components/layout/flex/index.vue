<template>
  <m-container>
    <m-doc-component-doc title="弹性布局组件">
      <m-doc-demo-block title="简单用法" :meta="code1">
        <template #desc>
          <p>弹性布局组件是基于<code>display: flex</code>属性封装的用于快速弹性布局的组件。</p>
          <p>包括<code>m-flex-row</code>、<code>m-flex-col</code>、<code>m-flex-fixed</code>、<code>m-flex-auto</code>四个组件</p>
        </template>
        <demo-1></demo-1>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import demo1 from './demos/1.vue'
import code1 from './demos/1.vue?raw'
export default {
  components: { demo1 },
  setup() {
    return {
      code1,
    }
  },
}
</script>
