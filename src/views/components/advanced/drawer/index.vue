<template>
  <m-container>
    <m-doc-component-doc title="抽屉组件(m-drawer)" :props="props" :events="events" :methods="methods" :slots="slots">
      <m-doc-demo-block title="简单抽屉" :meta="code1">
        <template #desc>
          <p>抽屉组件是在Element Plus中的<el-link type="primary" target="_blank" href="https://element-plus.gitee.io/#/zh-CN/component/drawer">Drawer 抽屉(el-drawer)</el-link>基础上封装。</p>
          <p>包含其所有功能的同时，扩展了一些额外功能，如：全屏按钮、自定义顶部工具栏，左侧图标，内容区域滚动条等等</p>
        </template>
        <demo-1></demo-1>
      </m-doc-demo-block>

      <m-doc-demo-block title="显示滚动条" :meta="code2">
        <template #desc>
          <p>当内容超出内容区域时，会自动显示滚动条。</p>
        </template>
        <demo-2></demo-2>
      </m-doc-demo-block>

      <m-doc-demo-block title="自定义工具按钮" :meta="code3">
        <template #desc>
          <p>通过<code>toolbar</code>插槽，用户可以在头部左侧的工具栏添加自己的工具按钮。</p>
        </template>
        <demo-3></demo-3>
      </m-doc-demo-block>

      <m-doc-demo-block title="自定义底部" :meta="code4">
        <template #desc>
          <p>通过<code>footer</code>插槽，用户可以在添加底部区域。</p>
        </template>
        <demo-4></demo-4>
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
import demo2 from './demos/2.vue'
import code2 from './demos/2.vue?raw'
import demo3 from './demos/3.vue'
import code3 from './demos/3.vue?raw'
import demo4 from './demos/4.vue'
import code4 from './demos/4.vue?raw'
export default {
  components: { demo1, demo2, demo3, demo4 },
  setup() {
    return {
      props,
      events,
      methods,
      slots,
      code1,
      code2,
      code3,
      code4,
    }
  },
}
</script>
