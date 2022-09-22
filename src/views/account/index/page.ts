import type { PageDefinition } from '@/types'
import component from './index.vue'

const page: PageDefinition = {
  name: 'doc_account',
  icon: 'user',
  path: '/doc/account',
  permissions: [],
  buttons: {
    add: {
      text: 'mkh.add',
      code: 'doc_account_add',
      permissions: [],
    },
    edit: {
      text: 'mkh.edit',
      code: 'doc_account_edit',
      permissions: [],
    },
    remove: {
      text: 'mkh.delete',
      code: 'doc_account_delete',
      permissions: [],
    },
  },
  component,
}

export default page
