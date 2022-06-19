<template>
  <el-select v-model="value_" v-loading="loading" class="m-select" element-loading-background="rgba(255,255,255,.6)" :placeholder="placeholder || $t('mkh.please_select')">
    <slot :options="options">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
    </slot>
  </el-select>
</template>
<script>
import { computed, inject, ref, watch } from 'vue'
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
    /** 是否选中第一个 */
    checkedFirst: Boolean,
    /** 是否创建时进行刷新 */
    refreshOnCreated: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'update:label', 'change'],
  setup(props, { emit }) {
    const resetMethods = inject('resetMethods', [])

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

    const loading = ref(false)
    const options = ref([])

    const refresh = () => {
      loading.value = true
      props
        .action()
        .then(data => {
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
        .finally(() => {
          loading.value = false
        })
    }

    const handleChange = val => {
      const option = options.value.find(m => m.value === val)
      emit('update:label', option != undefined ? option.label : '')
      emit('change', val, option, options)
    }

    if (props.refreshOnCreated) refresh()

    const reset = () => {
      value_.value = ''
      handleChange('')
    }

    watch(value_, handleChange)

    resetMethods.push(reset)

    return {
      value_,
      loading,
      options,
      refresh,
      reset,
      handleChange,
    }
  },
}
</script>
