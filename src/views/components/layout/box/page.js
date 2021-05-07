export default {
  //标题
  title: '盒子',
  //图标
  icon: 'box',
  //路由名称，需要唯一，推荐使用模块编码+下划线开头
  name: 'doc_layout_box',
  //路由路径
  path: '/doc/layout/box',
  //绑定权限
  permissions: [],
  //绑定按钮
  buttons: [],
  //路由组件
  component: () => import('./index.vue'),
}
