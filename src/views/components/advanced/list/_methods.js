export default [
  { name: 'query', desc: '查询', params: '-' },
  { name: 'refresh', desc: '刷新(刷新会将页码重置为1)', params: '-' },
  { name: 'reset', desc: '重置', params: '-' },
  { name: 'clearSelection', desc: '用于多选表格，清空用户的选择', params: '-' },
  { name: 'toggleRowSelection', desc: '用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）', params: 'row, selected' },
  { name: 'toggleAllSelection', desc: '用于多选表格，切换全选和全不选', params: '-' },
  { name: 'toggleRowExpansion', desc: '用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）', params: 'row, expanded' },
  { name: 'setCurrentRow', desc: '用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。', params: 'row' },
  { name: 'clearSort', desc: '用于清空排序条件，数据会恢复成未排序的状态', params: '-' },
  { name: 'doLayout', desc: '对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法', params: '-' },
]
