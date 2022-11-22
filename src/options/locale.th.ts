import type { MkhLocaleMessages } from '@/types'
import el from 'element-plus/lib/locale/lang/th'
import mkh from '@/locales/lang/th'
import mod_doc from '#/locales/lang/th'
import mod_doc_routes from '#/locales/lang/th/routes'

const options: MkhLocaleMessages = {
  name: 'th',
  el: el,
  mkh: mkh,
  routes: { ...mod_doc_routes },
  mod: {
    doc: mod_doc,
  },
  skin: {},
}

export default options
