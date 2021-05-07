/** 导入模块，自动加载模块中的页面pages和全局组件components */
import mod from '@mkh-module-doc'
import VCharts from 'vue-echarts'
import * as echarts from 'echarts'

/** 模块注册回调函数，当vue根实例挂载前调用 */
mod.callback = ({ app }) => {
  /* 注册vue-echarts组件 */
  /* 说明文档 https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md */
  app.component('VChart', VCharts)

  //绑定到全局变量
  app.config.globalProperties.$echarts = echarts
}

/** 配置登录组件 */
MkhUI.config.component.login = 'k'
/** 设置登录方法 */
MkhUI.config.actions.login = mod.api.login
/** 设置获取验证码方法 */
MkhUI.config.actions.getVerifyCode = mod.api.getVerifyCode
/** 设置获取账户信息方法 */
MkhUI.config.actions.getAccountInfo = mod.api.getAccountInfo
