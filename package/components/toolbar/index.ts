import mkh from '@/mkh'
import Fullscreen from './fullscreen/index.vue'
import Lang from './lang/index.vue'
import Skin from './skin/index.vue'

//系统内置工具栏
mkh.toolbars.lang = { code: 'lang', label: '多语言', show: true, sort: 0 }
mkh.toolbars.skin = { code: 'skin', label: '皮肤', show: true, sort: 0 }
mkh.toolbars.fullscreen = { code: 'fullscreen', label: '全屏', show: true, sort: 0 }

export default [
  { name: 'toolbar-fullscreen', component: Fullscreen },
  { name: 'toolbar-lang', component: Lang },
  { name: 'toolbar-skin', component: Skin },
]
