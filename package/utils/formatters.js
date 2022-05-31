import dayjs from 'dayjs'

let formatters = new Map()

//是否
formatters.set('whether', val => {
  return val === true || val == '1' ? '是' : '否'
})

//性别
formatters.set('sex', val => {
  return val == '1' ? '男' : '女'
})

//日期
formatters.set('date', (val, params) => {
  let template = 'YYYY-MM-DD HH:mm:ss'
  if (params && params.template) {
    template = params.template
  }
  return dayjs(val).format(template)
})

export default formatters
