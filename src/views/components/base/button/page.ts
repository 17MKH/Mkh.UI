import type { PageDefinition } from '@/types'
import component from './index.vue'

const page: PageDefinition = {
  icon: 'button',
  name: 'doc_base_button',
  path: '/doc/base/button',
  component,
  buttons: {},
}

export default page
