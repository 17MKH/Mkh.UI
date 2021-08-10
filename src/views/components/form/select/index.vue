<template>
  <m-container>
    <m-doc-component-doc title="下拉框组件(m-select)" :props="props">
      <m-doc-demo-block title="简单用法" :meta="code">
        <template #desc>
          <p>Element Plaus本身的下拉框组件<code>el-select</code>属于基础组件，直接使用时需要自己绑定数据，而在业务系统中，我们一般都是通过后端接口获取数据在绑定，</p>
          <p>为了方便使用，在<code>el-select</code>基础上封装了<code>m-select</code>组件，开发人员只需要提供获取下拉数据的方法绑定到action属性，组件会自动调用方法并渲染</p>
          <p>后端接口返回的数据必须是一个数组，数组中的对象格式如下：</p>
          <pre>
{
  //下拉选项的文本
  label:'',
  //下拉选项的值
  value:'',
  //是否禁用
  disabled:false
}
          </pre>
          <el-alert type="warning">组件会自动请求数据并渲染，所以如果使用了路由缓存，多次打开页面时下拉框数据不会刷新，需要的话请调用组件的query方法自行刷新</el-alert>
        </template>
        <demo></demo>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import props from './apis/_props'
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
