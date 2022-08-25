<template>
  <m-container>
    <m-doc-component-doc title="列表盒子组件(m-list-box)" :props="props" :events="events" :methods="methods" :slots="slots">
      <m-doc-demo-block title="列表盒子" :meta="code1">
        <template #desc> </template>
        <demo1></demo1>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script setup lang="ts">
  import props from './apis/_props'
  import events from './apis/_events'
  import methods from './apis/_methods'
  import slots from './apis/_slots'
  import demo1 from './demos/1.vue'
  import code1 from './demos/1.vue?raw'
</script>
