import type { PageDefinition } from '@/types'
import component from './index.vue'

const page: PageDefinition = {
  icon: 'home',
  name: 'doc_profile',
  path: '/doc/profile',
  component,
  buttons: {},
}

export default page
