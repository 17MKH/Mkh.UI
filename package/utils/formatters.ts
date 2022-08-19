import type { FormatterFunction } from '@/types'
import dayjs from 'dayjs'

let formatters: Map<string, FormatterFunction> = new Map()

//是否
formatters.set('whether', (val: boolean | string | number) => {
  return val === true || val === '1' || val === 1 || val === 'yes' ? '是' : '否'
})

//性别
formatters.set('sex', (val: number | string) => {
  return val === '1' || val === 1 ? '男' : '女'
})

//日期
formatters.set('date', (val: string, row, column, params: { template: string }) => {
  let template = 'YYYY-MM-DD HH:mm:ss'
  if (params && params.template) {
    template = params.template
  }
  return dayjs(val).format(template)
})

export default formatters
