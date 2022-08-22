import type { MkhLocaleMessages } from '@/types'
import el from 'element-plus/es/locale/lang/en'
import mkh from '@/locales/lang/en'
import mod_doc from '../locales/en'
import mod_doc_routes from '../locales/en/routes'

const options: MkhLocaleMessages = {
  name: 'en',
  el: el,
  mkh: mkh,
  routes: { ...mod_doc_routes },
  mod: {
    doc: mod_doc,
  },
  skin: {},
}

export default options
