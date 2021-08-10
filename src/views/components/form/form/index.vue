<template>
  <m-container>
    <m-doc-component-doc title="表单组件(m-form)" :props="props" :events="events" :methods="methods" :slots="slots">
      <m-doc-demo-block title="简单表单" :meta="code1">
        <template #desc>
          <p>表单组件是在<code>el-form</code>组件的基础上将验证和提交操作做了简单封装，<code>el-form</code>组件的属性都有效。</p>
          <p>组件提供了一个action属性用于设置表单提交方法，当提交时会自动校验并调用该方法，同时根据接口返回的结果展示不同的提示。</p>
          <el-alert title="action必须是一个返回Promise对象的方法" type="warning" :closable="false"> </el-alert>
          <p>组件内置了加载动画，默认提交时会显示，如果不需要，可以通过<code>no-loading</code>关闭</p>
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
