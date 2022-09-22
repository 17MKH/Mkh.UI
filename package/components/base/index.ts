import Button from './button/index.vue'
import ButtonAdd from './button-add/index.vue'
import ButtonDelete from './button-delete/index.vue'
import ButtonEdit from './button-edit/index.vue'
import Icon from './icon/index.vue'
import Tip from './tip/index.vue'

export default [
  { name: 'button', component: Button },
  { name: 'button-add', component: ButtonAdd },
  { name: 'button-delete', component: ButtonDelete },
  { name: 'button-edit', component: ButtonEdit },
  { name: 'icon', component: Icon },
  { name: 'tip', component: Tip },
]

export type MButton = InstanceType<typeof Button>
export type MButtonAdd = InstanceType<typeof ButtonAdd>
export type MButtonDelete = InstanceType<typeof ButtonDelete>
export type MButtonEdit = InstanceType<typeof ButtonEdit>
export type MIcon = InstanceType<typeof Icon>
export type MTip = InstanceType<typeof Tip>
