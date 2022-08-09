import Box from './box/index.vue'
import BoxSmall from './box-small/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import Container from './container/index.vue'
import FlexAuto from './flex-auto/index.vue'
import FlexCol from './flex-col/index.vue'
import FlexFixed from './flex-fixed/index.vue'
import FlexRow from './flex-row/index.vue'
import Head from './head/index.vue'
import Menu from './menu/index.vue'
import Scrollbar from './scrollbar/index.vue'
import Split from './split/index.vue'
import Tabs from './tabs/index.vue'

export default [
  { name: 'box', component: Box },
  { name: 'box-small', component: BoxSmall },
  { name: 'breadcrumb', component: Breadcrumb },
  { name: 'container', component: Container },
  { name: 'flex-auto', component: FlexAuto },
  { name: 'flex-col', component: FlexCol },
  { name: 'flex-fixed', component: FlexFixed },
  { name: 'flex-row', component: FlexRow },
  { name: 'head', component: Head },
  { name: 'menu', component: Menu },
  { name: 'scrollbar', component: Scrollbar },
  { name: 'split', component: Split },
  { name: 'tabs', component: Tabs },
]
