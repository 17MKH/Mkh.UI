<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    :range-separator="$t('mkh.to')"
    :start-placeholder="$t('mkh.start_date')"
    :end-placeholder="$t('mkh.end_date')"
    value-format="YYYY-MM-DD"
    @change="onChange"
  />
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import props from './props'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

export default {
  props,
  emits: ['change', 'update:start', 'update:end'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const value = ref([])

    const reset = () => {
      var mow = new Date()
      const start = dayjs(mow).format('YYYY-MM-DD')
      const end = dayjs(mow).format('YYYY-MM-DD')
      value.value = [start, end]
    }

    const onChange = val => {
      if (!val || val.length < 2) {
        reset()
        val = value.value
      } else if (dayjs(val[0]).format('YYYY-MM') !== dayjs(val[1]).format('YYYY-MM')) {
        reset()
        val = value.value
        const { $t } = cit
        ElMessage({
          message: $t('mkh.date_cannot_access_month'),
          type: 'warning',
        })
      }

      emit('update:start', val[0])
      emit('update:end', val[1])
      emit('change', val)
    }

    onChange()

    return {
      value,
      onChange,
    }
  },
}
</script>
