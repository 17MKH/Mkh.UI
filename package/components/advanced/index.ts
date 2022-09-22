import Dialog from './dialog/index.vue'
import DragSort from './drag-sort/index.vue'
import Drawer from './drawer/index.vue'
import List from './list/index.vue'
import ListBox from './list-box/index.vue'

export default [
  { name: 'dialog', component: Dialog },
  { name: 'drag-sort', component: DragSort },
  { name: 'drawer', component: Drawer },
  { name: 'list', component: List },
  { name: 'list-box', component: ListBox },
]

export type MDialog = InstanceType<typeof Dialog>
export type MDragSort = InstanceType<typeof DragSort>
export type MDrawer = InstanceType<typeof Drawer>
export type MList = InstanceType<typeof List>
export type MListBox = InstanceType<typeof ListBox>
