<template>
  <m-container>
    <m-doc-component-doc title="抽屉组件(m-drawer)" :props="props" :events="events" :methods="methods" :slots="slots">
      <m-doc-demo-block title="简单对话框" :meta="code1">
        <template #desc>
          <p>抽屉组件是在Element Plus中的<el-link type="primary" target="_blank" href="https://element-plus.gitee.io/#/zh-CN/component/drawer">Drawer 抽屉(el-drawer)</el-link>基础上封装。</p>
          <p>包含其所有功能的同时，扩展了一些额外功能，如：全屏按钮、自定义顶部工具栏，左侧图标，内容区域滚动条等等</p>
        </template>
        <demo-1></demo-1>
      </m-doc-demo-block>

      <m-doc-demo-block title="显示滚动条" :meta="code3">
        <template #desc>
          <p>当对话框的内容超出内容区域时，会自动显示滚动条。</p>
        </template>
        <demo-3></demo-3>
      </m-doc-demo-block>

      <m-doc-demo-block title="自定义工具按钮" :meta="code5">
        <template #desc>
          <p>通过<code>toolbar</code>插槽，用户可以在头部左侧的工具栏添加自己的工具按钮。</p>
        </template>
        <demo-5></demo-5>
      </m-doc-demo-block>

      <m-doc-demo-block title="自定义底部" :meta="code6">
        <template #desc>
          <p>通过<code>footer</code>插槽，用户可以在添加底部区域。</p>
        </template>
        <demo-6></demo-6>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from './_props'
import events from './_events'
import methods from './_methods'
import slots from './_slots'
import demo1 from './demos/1.vue'
import code1 from './demos/1.vue?raw'
import demo3 from './demos/3.vue'
import code3 from './demos/3.vue?raw'
import demo5 from './demos/5.vue'
import code5 from './demos/5.vue?raw'
import demo6 from './demos/6.vue'
import code6 from './demos/6.vue?raw'
export default {
  components: { demo1, demo3, demo5, demo6 },
  setup() {
    return {
      props,
      events,
      methods,
      slots,
      code1,
      code3,
      code5,
      code6,
    }
  },
}
</script>
