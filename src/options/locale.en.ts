import type { MkhLocaleMessages } from '@/types'
import el from 'element-plus/lib/locale/lang/en'
import mkh from '@/locales/lang/en'
import mod_doc from '../locales/en'
import mod_doc_routes from '../locales/en/routes'

const options: MkhLocaleMessages = {
  name: 'en',
  label: 'English',
  el: el,
  mkh: mkh,
  routes: { ...mod_doc_routes },
  mod: {
    doc: mod_doc,
  },
  skin: {},
}

export default options
