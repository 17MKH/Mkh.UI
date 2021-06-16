<template>
  <el-select v-model="value_" v-loading="loading" class="m-select" :size="size_" element-loading-background="rgba(255,255,255,.6)" @change="handleChange">
    <slot :options="options">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
    </slot>
  </el-select>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Select',
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
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const value_ = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit('update:modelValue', val)
      },
    })

    const store = useStore()
    const size_ = computed(() => props.size || store.state.app.profile.skin.size)

    const loading = ref(false)
    const options = ref([])

    const query = () => {
      loading.value = true
      props
        .action()
        .then(data => {
          options.value = data
          if (props.checkedFirst && data.length > 0) {
            value_.value = data[0].value
            handleChange(value_.value)
          }
        })
        .finally(() => {
          loading.value = false
        })
    }

    const handleChange = val => {
      const option = options.value.find(m => m.value === val)
      emit('change', val, option, options)
    }

    query()

    return {
      value_,
      size_,
      loading,
      options,
      query,
      handleChange,
    }
  },
}
</script>
