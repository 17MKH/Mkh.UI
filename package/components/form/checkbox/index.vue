<template>
  <el-checkbox-group v-model="value_" class="m-checkbox" :size="size_">
    <slot :options="options">
      <el-checkbox v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-checkbox>
    </slot>
  </el-checkbox-group>
</template>
<script>
import { computed, inject, ref, watch } from 'vue'
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update:label', 'change'],
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

    let firstRefresh = true

    const size_ = computed(() => props.size || store.state.app.profile.skin.size)

    const options = ref([])

    const refresh = () => {
      props.action().then(data => {
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

    const handleChange = val => {
      emit(
        'change',
        val,
        options.value.filter(m => val.includes(m.value))
      )
    }

    refresh()

    const reset = () => {
      value_.value = ''
      handleChange('')
    }

    watch(value_, handleChange)

    resetMethods.push(reset)

    return {
      value_,
      size_,
      options,
      refresh,
      reset,
      handleChange,
    }
  },
}
</script>
