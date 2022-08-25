export default [
  { name: 'loading-text', desc: '加载动画文本', type: 'String', values: '-', default: `` },
  { name: 'loading-background', desc: '加载动画背景色', type: 'String', values: '-', default: '-' },
  { name: 'loading-spinner', desc: '加载动画图标', type: 'String', values: '-', default: '-' },
  { name: 'no-loading', desc: '不显示加载动画', type: 'Boolean', values: '-', default: '-' },
  { name: 'action', desc: '表单提交方法', type: 'Function', values: '-', default: '-' },
  { name: 'label-width', desc: '标签的宽度', type: 'String', values: '-', default: '100px' },
  { name: 'custom-validate', desc: '自定义验证方法，该方法会在表单验证通过后调用', type: 'Function', values: '-', default: '-' },
]
