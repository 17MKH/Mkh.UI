<template>
  <el-radio-group v-model="value_" class="m-radio" :size="size_">
    <slot :options="options">
      <el-radio v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-radio>
    </slot>
  </el-radio-group>
</template>
<script setup lang="ts">
  import { computed, inject, ref, watch } from 'vue'
  import { useSize } from '@/composables'
  import { size } from '@/types'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    /** 是否选中第一个 */
    checkedFirst: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '',
    },
  })
  const emit = defineEmits(['update:modelValue', 'change'])

  const resetMethods: Array<() => void> = inject('resetMethods', [])
  const value_ = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  //是否首次刷新
  let firstRefresh = true

  const size_ = useSize(props as { size: size })

  const options = ref<any[]>([])

  const refresh = () => {
    props.action().then((data: any) => {
      options.value = data

      if (firstRefresh) {
        if (value_.value) {
          //首次刷新并且存在初始值
          handleChange(value_.value)
        } else if (props.checkedFirst && data.length > 0) {
          //首次刷新并且默认选中第一个选项
          const checkedValue = data[0].value
          value_.value = checkedValue
          handleChange(checkedValue)
        }

        firstRefresh = false
      }
    })
  }

  const handleChange = (val: any) => {
    const option = options.value.find((m) => m.value === val)
    emit('change', val, option, options)
  }

  refresh()

  const reset = () => {
    value_.value = ''
    handleChange('')
  }

  watch(value_, handleChange)

  resetMethods.push(reset)

  defineExpose({ refresh, reset })
</script>
