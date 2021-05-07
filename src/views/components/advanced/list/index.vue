<template>
  <mu-container>
    <mu-doc-component-doc title="列表页组件(mu-list)" :props="props" :events="events" :methods="methods" :slots="slots">
      <mu-doc-demo-block title="简单列表页" :meta="code1">
        <template #desc>
          <p>列表页组件是一个查询展示数据列表的组件，主要由查询栏、数据表格、分页信息三部分组成，用户只需关注自己的业务部分即可。</p>
          <p>列表页组件整体看起来像一个盒子组件<code>nm-box</code>，顶部左侧也有一个工具栏，内置刷新以及全屏两个按钮，与盒子组件一样，您也可以自定义添加工具按钮。</p>
          <p>列表页组件需要一个<code>cols</code>属性，该属性用于定义列信息，基本上与Element Plus中的<code>el-table-column</code>组件的属性一致，其格式如下：</p>
          <pre>
{
  /** 控制列是否显示 */
  show: true,
  /** 对应列内容的字段名 */
  prop: '',
  /** 显示的列标题 */
  label: '',
  /** 对应列的宽度 */
  width: '',
  /** 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
  minWidth: '',
  /** 列是否固定在左侧或者右侧，true 表示固定在左侧，可选：true, left, right */
  fixed: '',
  /** 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 */
  sortable: false,
  /** 用来格式化内容 */
  formatter: null,
  // 当内容过长被隐藏时显示 tooltip
  showOverflowTooltip: true,
  /** 对齐方式 */
  align: 'center',
  /** 表头对齐方式，若不设置该项，则使用表格的对齐方式 */
  headerAlign: 'center',
  /** 列的 className */
  className: '',
  /** 当前列标题的自定义类名 */
  labelClassName: '',
}
            </pre
          >
        </template>
        <demo-1></demo-1>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="查询栏按钮" :meta="code2">
        <template #desc>
          <p>查询栏内置了三个按钮，查询、重置、删除，其中查询和重置默认显示，删除默认不显示，三个按钮都可以通过属性控制是否显示</p>
          <p>同时您也可以通过<code>querybar-buttons</code>插槽，在三个按钮后面添加自定义的按钮</p>
        </template>
        <demo-2></demo-2>
      </mu-doc-demo-block>

      <mu-doc-demo-block title="工具栏" :meta="code2">
        <template #desc>
          <p>工具栏位于列表页组件的头部的右侧区域，内置了两个工具按钮，刷新和全屏按钮，默认都显示，可以通过属性控制是否显示</p>
          <p>同时您也可以通过<code>toolbar</code>插槽，在刷新按钮前面添加自定义的工具按钮</p>
        </template>
        <demo-3></demo-3>
      </mu-doc-demo-block>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import props from './_props'
import events from './_events'
import methods from './_methods'
import slots from './_slots'
import demo1 from './demos/1.vue'
import code1 from '!./demos/1.vue'
import demo2 from './demos/2.vue'
import code2 from '!./demos/2.vue'
import demo3 from './demos/3.vue'
import code3 from '!./demos/3.vue'
export default {
  components: { demo1, demo2, demo3 },
  setup() {
    return {
      props,
      events,
      methods,
      slots,
      code1,
      code2,
      code3,
    }
  },
}
</script>
