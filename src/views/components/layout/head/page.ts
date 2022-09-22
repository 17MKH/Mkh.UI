import type { PageDefinition } from '@/types'
import component from './index.vue'

const page: PageDefinition = {
  icon: 'head',
  name: 'doc_layout_head',
  path: '/doc/layout/head',
  component,
  buttons: {},
}

export default page
