import type { PageDefinition } from '@/types'
import component from './index.vue'

const page: PageDefinition = {
  icon: 'home',
  name: 'doc_home',
  path: '/doc/home',
  component,
  buttons: {},
}

export default page
