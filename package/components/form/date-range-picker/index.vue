<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    :range-separator="t('mkh.to')"
    :start-placeholder="t('mkh.start_date')"
    :end-placeholder="t('mkh.end_date')"
    value-format="YYYY-MM-DD"
    @change="onChange"
  />
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import dayjs from 'dayjs'
  import { ElMessage } from 'element-plus'
  import { useI18n } from '@/composables/i18n'

  const { t } = useI18n()

  const props = defineProps({
    /** 模式 'day', 'month', 'year' */
    mode: {
      type: String,
      default: 'month',
      validator(value: string) {
        return ['month', 'year'].includes(value)
      },
    },
    /** 开始日期 */
    start: {
      type: Date,
    },
    /** 结束日期 */
    end: {
      type: Date,
    },
  })

  const emit = defineEmits(['change', 'update:start', 'update:end'])

  const value = ref<string[]>([])

  const reset = () => {
    var mow = new Date()
    const start = dayjs(mow).format('YYYY-MM-DD')
    const end = dayjs(mow).format('YYYY-MM-DD')
    value.value = [start, end]
  }

  const onChange = (val?: string[]) => {
    if (!val || val.length < 2) {
      reset()
      val = value.value
    } else if (dayjs(val[0]).format('YYYY-MM') !== dayjs(val[1]).format('YYYY-MM')) {
      reset()
      val = value.value
      ElMessage({
        message: t('mkh.date_cannot_access_month'),
        type: 'warning',
      })
    }

    emit('update:start', val[0])
    emit('update:end', val[1])
    emit('change', val)
  }

  onChange()
</script>
