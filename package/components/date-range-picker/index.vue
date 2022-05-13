<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    :range-separator="$t('mkh.to')"
    :start-placeholder="$t('mkh.startDate')"
    :end-placeholder="$t('mkh.endDate')"
    value-format="YYYY-MM-DD"
    @change="onChange"
  />
</template>
<script>
import { ref } from 'vue'
import props from './props'
import dayjs from 'dayjs'
import useMessage from '../../composables/message'

export default {
  props,
  emits: ['change', 'update:start', 'update:end'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const value = ref([])
    const message = useMessage()

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
        message.confirm($t('mkh.date_cannot_access_month'), $t('mkh.warning'), { showCancelButton: false })
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
