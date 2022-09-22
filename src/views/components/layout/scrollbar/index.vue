<template>
  <m-container>
    <m-doc-component-doc title="弹性布局组件" :props="props">
      <m-doc-demo-block title="简单用法" :meta="code1">
        <template #desc>
          <p>滚动条组件，如其名~</p>
        </template>
        <demo1></demo1>
      </m-doc-demo-block>
      <m-doc-demo-block title="显示水平滚动条" :meta="code2">
        <template #desc>
          <p>通过设置<code>horizontal</code>属性可以显示水平滚动条</p>
        </template>
        <demo2></demo2>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script setup lang="ts">
  import props from './apis/_props'
  import demo1 from './demos/1.vue'
  import code1 from './demos/1.vue?raw'
  import demo2 from './demos/2.vue'
  import code2 from './demos/2.vue?raw'
</script>
