/**
 * 框架名称
 */
const UI_NAME = 'mkh-ui'

/**
 * 模块前缀
 */
const MODULE_PREFIX = 'mkh-mod-'

/**
 * 皮肤前缀
 */
const SKIN_PREFIX = 'mkh-skin-'

/**
 * 导入模块时的前缀
 */
const IMPORT_MODULE_PREFIX = 'virtual:mkh-mod-'

/**
 * 导入语言包时的前缀
 */
const IMPORT_LOCALE_PREFIX = '$mkh-locale'

//打包时忽略的依赖项
const external = ['axios', 'vue', 'vue-router', 'pinia', 'element-plus', 'lodash', 'sortablejs', 'vue-i18n', 'echarts', 'vue-echarts']

export { UI_NAME, MODULE_PREFIX, IMPORT_MODULE_PREFIX, SKIN_PREFIX, IMPORT_LOCALE_PREFIX, external }
