export default {
  //标题
  title: '抽屉',
  //图标
  icon: 'chat-o',
  //路由名称，需要唯一，推荐使用模块编码+下划线开头
  name: 'doc_advanced_drawer',
  //路由路径
  path: '/doc/advanced/drawer',
  //路由组件
  component: () => import('./index.vue'),
}
