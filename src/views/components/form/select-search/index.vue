<template>
  <m-container>
    <m-doc-component-doc title="下拉框组件(m-select)" :props="props">
      <m-doc-demo-block title="简单用法" :meta="code">
        <template #desc>
          <p>Element Plaus本身的下拉框组件<code>el-select</code>属于基础组件，直接使用时需要自己绑定数据，而在业务系统中，我们一般都是通过后端接口获取数据在绑定，</p>
        </template>
        <demo></demo>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from '../select/apis/_props'
import demo from './demos/1.vue'
import code from './demos/1.vue?raw'
export default {
  components: { demo },
  setup() {
    return {
      props,
      code,
    }
  },
}
</script>
