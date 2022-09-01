<template>
  <el-checkbox-group v-model="value_" class="m-checkbox" :size="size_">
    <slot :options="options">
      <el-checkbox v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-checkbox>
    </slot>
  </el-checkbox-group>
</template>
<script setup lang="ts">
  import { computed, inject, ref, watch } from 'vue'
  import { useSize } from '@/composables/size'
  import { size } from '@/types'

  const props = defineProps({
    modelValue: {
      type: Array,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    size: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['update:modelValue', 'update:label', 'change'])

  const resetMethods = inject<any>('resetMethods', [])
  const value_ = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

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
        }
        firstRefresh = false
      }
    })
  }

  const handleChange = (val: any[]) => {
    emit(
      'change',
      val,
      options.value.filter((m) => val.includes(m.value))
    )
  }

  refresh()

  const reset = () => {
    value_.value = []
    handleChange([])
  }

  watch(value_, handleChange)

  resetMethods.push(reset)

  defineExpose({
    refresh,
    reset,
  })
</script>
