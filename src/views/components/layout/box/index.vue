<template>
  <mu-container>
    <mu-doc-component-doc title="盒子组件(mu-box)" :props="props" :events="events" :methods="methods" :slots="slots">
      <mu-doc-demo-block title="简单盒子" :meta="code1">
        <template #desc>
          盒子组件与Element Plus中的<el-link type="primary" target="_blank" href="https://element-plus.gitee.io/#/zh-CN/component/card">卡片组件(el-card)</el-link>类似，但是可选功能上要比它多一些
        </template>
        <demo-1></demo-1>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="带头部标题和图片的盒子" :meta="code2">
        <template #desc> 可以通过设置<code>header</code>、<code>title</code>、<code>icon</code>为盒子添加头部、标题、左侧图标 </template>
        <demo-2></demo-2>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="头部工具栏" :meta="code3">
        <template #desc>
          <p>盒子头部的右侧是工具栏区域，并且内置了折叠、全屏两个功能按钮，同时用户也可以通过<code>toolbar</code>插槽添加自己的功能按钮</p>
        </template>
        <demo-3></demo-3>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="底部功能栏" :meta="code4">
        <template #desc>
          <p>盒子提供了提供了<code>footer</code>插槽供用户在底部添加自定义内容。</p>
        </template>
        <demo-4></demo-4>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="加载动画" :meta="code5">
        <template #desc>
          <p>盒子提供了加载动画的效果，用于当执行耗时操作(比如接口请求)时给用户一个友好提示。</p>
          <p>当然，你也可以通过加载动画相关的属性来对加载动画样式自定义~</p>
        </template>
        <demo-5></demo-5>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="内容自适应" :meta="code6">
        <template #desc>
          <p>当给盒子设置了<code>height</code>属性后，盒子的内容区域会变成自适应，当内容超出会出现滚动条。</p>
          <p>盒子同时提供了<code>page</code>属性，该属性会让盒子充满父级节点，相当于<code>height:100%</code>。</p>
          <p>如果您动态修改了盒子中的内容，有可能会出现滚动条错乱的情况，此时可以通过组件提供的<code>resizeScrollbar</code>方法来重置滚动条。</p>
        </template>
        <demo-6></demo-6>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="盒子布局" :meta="code7">
        <template #desc>
          <p>
            很多人应该都做过下面这种类似的仪表盘或者面板，对于这种页面布局，您可以通过<code>el-row</code>组件来实现，同时为了能够让同一行的盒子组件高度一致，需要在<code>el-row</code>组件上添加一个<code>class="mu-box-row"</code>，这样盒子高度会自动填充100%
          </p>
        </template>
        <demo-7></demo-7>
      </mu-doc-demo-block>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import demo1 from './demos/1.vue'
import code1 from '!./demos/1.vue'
import demo2 from './demos/2.vue'
import code2 from '!./demos/2.vue'
import demo3 from './demos/3.vue'
import code3 from '!./demos/3.vue'
import demo4 from './demos/4.vue'
import code4 from '!./demos/4.vue'
import demo5 from './demos/5.vue'
import code5 from '!./demos/5.vue'
import demo6 from './demos/6.vue'
import code6 from '!./demos/6.vue'
import demo7 from './demos/7.vue'
import code7 from '!./demos/7.vue'
import props from './_props'
import events from './_events'
import methods from './_methods'
import slots from './_slots'
export default {
  components: { demo1, demo2, demo3, demo4, demo5, demo6, demo7 },
  setup() {
    return {
      code1,
      code2,
      code3,
      code4,
      code5,
      code6,
      code7,
      props,
      events,
      methods,
      slots,
    }
  },
}
</script>
