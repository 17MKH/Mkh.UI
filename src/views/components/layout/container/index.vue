<template>
  <m-container>
    <m-doc-component-doc title="容器组件(m-container)" :props="props" :methods="methods">
      <m-doc-demo-block title="简单用法">
        <template #desc>
          <p>容器组件是一个简单但是必要的核心页面级组件，每个页面都需要使用该组件作为根组件。</p>
          <p>容器组件采用绝对定位，宽高都是100%，会填充满整个页面内容区域。</p>
        </template>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from './apis/_props'
import methods from './apis/_methods'
export default {
  setup() {
    return {
      props,
      methods,
    }
  },
}
</script>
