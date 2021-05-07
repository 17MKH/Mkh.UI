<template>
  <mu-container>
    <mu-doc-component-doc title="按钮组件(mu-button)" :props="props">
      <mu-doc-demo-block title="简单用法" :meta="code">
        <template #desc> 按钮组件是与Element Plaus本身的按钮组件<code>el-button</code>功能上是保持一致的，区别是图标使用框架自带的图标和用户导入的图标 </template>
        <demo></demo>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="按钮权限" :meta="code2">
        <template #desc>
          <p>按钮组件提供了一个<code>code</code>属性，用于给按钮绑定一个唯一编码，用来实现按钮权限验证功能。</p>
          <p>为了保障按钮编码唯一，我们按照模块化的约定，采用<code>模块编码_页面名称_按钮操作名称</code>的格式来定义按钮编码，如权限管理模块添加账户按钮的编码就是:<code>admin_account_add</code>。</p>
        </template>
        <demo-2></demo-2>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="删除按钮" :meta="code3">
        <template #desc>
          <p>删除按钮组件在按钮基础上默认了针对删除功能的属性，如图标是<code>delete</code>和按钮文本是<code>删除</code>，以及封装了二次确认提示的功能，非常适合CRUD中删除操作。</p>
        </template>
        <demo-3></demo-3>
      </mu-doc-demo-block>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import demo from './demos/1.vue'
import code from '!./demos/1.vue'
import demo2 from './demos/2.vue'
import code2 from '!./demos/2.vue'
import demo3 from './demos/3.vue'
import code3 from '!./demos/3.vue'
import props from './_props'
export default {
  components: { demo, demo2, demo3 },
  setup() {
    return {
      code,
      code2,
      code3,
      props,
    }
  },
}
</script>
