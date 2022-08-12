import el from 'element-plus/es/locale/lang/zh-cn'
import mkh from '@/locales/lang/zh-cn'
import mod_doc from './locales/zh-cn'
import mod_doc_routes from './locales/zh-cn/routes'

export default {
  name: 'zh-cn',
  el: el,
  mkh: mkh,
  routes: { ...mod_doc_routes },
  mod: {
    doc: mod_doc,
  },
  skin: {},
}
