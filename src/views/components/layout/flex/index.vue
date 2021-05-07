<template>
  <mu-container>
    <mu-doc-component-doc title="弹性布局组件">
      <mu-doc-demo-block title="简单用法" :meta="code1">
        <template #desc>
          <p>弹性布局组件是基于<code>display: flex</code>属性封装的用于快速弹性布局的组件。</p>
          <p>包括<code>mu-flex-row</code>、<code>mu-flex-column</code>、<code>mu-flex-left</code>、<code>mu-flex-right</code>、<code>mu-flex-top</code>、<code>mu-flex-bottom</code>六个组件</p>
        </template>
        <demo-1></demo-1>
      </mu-doc-demo-block>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import demo1 from './demos/1.vue'
import code1 from '!./demos/1.vue'
export default {
  components: { demo1 },
  setup() {
    return {
      code1,
    }
  },
}
</script>
