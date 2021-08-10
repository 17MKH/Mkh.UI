<template>
  <m-doc-component-doc title="对话框组件(m-dialog)" :props="props" :events="events" :methods="methods" :slots="slots">
    <m-doc-demo-block title="简单对话框" :meta="code1">
      <template #desc>
        <p>对话框组件是在Element Plus中的<el-link type="primary" target="_blank" href="https://element-plus.gitee.io/#/zh-CN/component/dialog">Dialog组件(el-card)</el-link>基础上封装。</p>
        <p>包含其所有功能的同时，扩展了一些额外功能，如：全屏按钮、自定义顶部工具栏，左侧图标，内容区域滚动条，拖拽等等</p>
      </template>
      <demo-1></demo-1>
    </m-doc-demo-block>

    <m-doc-demo-block title="自定义宽高" :meta="code2">
      <template #desc>
        <p>对话框组件默认垂直和水平居中，宽度为<code>50%</code>，高度为当前浏览器窗口减去top属性的两倍，当然，用户也可以通过<code>width</code>和<code>height</code>属性设置宽高。</p>
        <el-alert title="注意" type="warning"> 宽高属性只能为字符串类型，并且只能是<code>px</code>或者<code>%</code>的单位格式，如：500px、30% </el-alert>
      </template>
      <demo-2></demo-2>
    </m-doc-demo-block>

    <m-doc-demo-block title="显示滚动条" :meta="code3">
      <template #desc>
        <p>当对话框的内容超出内容区域时，会自动显示滚动条。</p>
      </template>
      <demo-3></demo-3>
    </m-doc-demo-block>

    <m-doc-demo-block title="可拖拽" :meta="code4">
      <template #desc>
        <p>通过设置<code>draggable</code>属性，可以让对话框启用拖拽功能。</p>
        <p>默认只能再当前可视窗口中拖拽，通过<code>drag-out-page</code>属性可以设置拖出可视窗口区域，</p>
      </template>
      <demo-4></demo-4>
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
import demo5 from './demos/5.vue'
import code5 from './demos/5.vue?raw'
import demo6 from './demos/6.vue'
import code6 from './demos/6.vue?raw'
export default {
  components: { demo1, demo2, demo3, demo4, demo5, demo6 },
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
      code5,
      code6,
    }
  },
}
</script>
