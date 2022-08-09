<template>
  <el-cascader :options="options" @change="handleChange"></el-cascader>
</template>
<script>
import { ref } from 'vue'
export default {
  props: {
    /**数据查询方法 */
    action: {
      type: Function,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const options = ref([])
    const allOptions = ref([])

    const resolveAllOptions = opts => {
      if (opts && opts.length > 0) {
        opts.forEach(o => {
          allOptions.value.push(o)

          resolveAllOptions(o.children)
        })
      }
    }

    const refresh = async () => {
      options.value = await props.action()

      allOptions.value = []
      resolveAllOptions(options.value)
    }
    refresh()

    const handleChange = val => {
      let opt = allOptions.value.find(m => m.value === val)
      emit('change', val, opt)
    }

    return {
      options,
      refresh,
      handleChange,
    }
  },
}
</script>
