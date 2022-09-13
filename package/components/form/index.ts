import Cascader from './cascader/index.vue'
import Checkbox from './checkbox/index.vue'
import DateRangePicker from './date-range-picker/index.vue'
import Form from './form/index.vue'
import FormBox from './form-box/index.vue'
import FormDialog from './form-dialog/index.vue'
import FormDrawer from './form-drawer/index.vue'
import IconPicker from './icon-picker/index.vue'
import ListSelect from './list-select/index.vue'
import Radio from './radio/index.vue'
import Select from './select/index.vue'
import SelectSearch from './select-search/index.vue'
import SelectWhether from './select-whether/index.vue'
import VerifycodeInput from './verifycode-input/index.vue'

export default [
  { name: 'cascader', component: Cascader },
  { name: 'checkbox', component: Checkbox },
  { name: 'date-range-picker', component: DateRangePicker },
  { name: 'form', component: Form },
  { name: 'form-box', component: FormBox },
  { name: 'form-dialog', component: FormDialog },
  { name: 'form-drawer', component: FormDrawer },
  { name: 'icon-picker', component: IconPicker },
  { name: 'list-select', component: ListSelect },
  { name: 'radio', component: Radio },
  { name: 'select', component: Select },
  { name: 'select-search', component: SelectSearch },
  { name: 'select-whether', component: SelectWhether },
  { name: 'verifycode-input', component: VerifycodeInput },
]

export type MCascader = InstanceType<typeof Cascader>
export type MCheckbox = InstanceType<typeof Checkbox>
export type MDateRangePicker = InstanceType<typeof DateRangePicker>
export type MForm = InstanceType<typeof Form>
export type MFormDialog = InstanceType<typeof FormDialog>
export type MFormDrawer = InstanceType<typeof FormDrawer>
export type MIconPicker = InstanceType<typeof IconPicker>
export type MListSelect = InstanceType<typeof ListSelect>
export type MRadio = InstanceType<typeof Radio>
export type MSelect = InstanceType<typeof Select>
export type MSelectSearch = InstanceType<typeof SelectSearch>
export type MSelectWhether = InstanceType<typeof SelectWhether>
export type MVerifycodeInput = InstanceType<typeof VerifycodeInput>
