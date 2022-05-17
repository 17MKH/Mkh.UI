<template>
  <el-select v-model="value_" :loading="loading" filterable remote :remote-method="remoteMethod" @change="handleChange">
    <slot :options="options">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
    </slot>
  </el-select>
</template>
<script>
import { computed, inject, ref } from 'vue'
export default {
  props: {
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
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const { store } = mkh

    const resetMethods = inject('resetMethods', [])

    const value_ = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit('update:modelValue', val)
      },
    })

    let timer = null
    const loading = ref(false)
    const options = ref([])

    const remoteMethod = keyword => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        if (keyword !== '') {
          loading.value = true
          props
            .action(keyword)
            .then(data => {
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

    const handleChange = val => {
      const option = options.value.find(m => m.value === val)
      emit('change', val, option, options)
    }

    const reset = () => {
      value_.value = ''
    }

    resetMethods.push(reset)

    return {
      value_,
      loading,
      options,
      remoteMethod,
      handleChange,
      reset,
    }
  },
}
</script>
