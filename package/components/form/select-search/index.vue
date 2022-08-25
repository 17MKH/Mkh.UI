<template>
  <el-select v-model="value_" :loading="loading" filterable remote :remote-method="remoteMethod" @change="handleChange" :placeholder="placeholder || $t('mkh.please_select')">
    <slot :options="options">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
    </slot>
  </el-select>
</template>
<script setup lang="ts">
  import { computed, inject, ref } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    /** 搜索间隔，单位毫秒 */
    searchInterval: {
      type: Number,
      default: 700,
    },
    placeholder: {
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

  let timer: any = undefined
  const loading = ref(false)
  const options = ref<any[]>([])

  const remoteMethod = (keyword: string) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (keyword !== '') {
        loading.value = true
        props
          .action(keyword)
          .then((data: any) => {
            options.value = data
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        options.value = []
      }
    }, props.searchInterval)
  }

  const handleChange = (val: any) => {
    const option = options.value.find((m) => m.value === val)
    emit('change', val, option, options)
  }

  const reset = () => {
    value_.value = ''
  }

  resetMethods.push(reset)

  defineExpose({
    reset,
  })
</script>
