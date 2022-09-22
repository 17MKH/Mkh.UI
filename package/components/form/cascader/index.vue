<template>
  <el-cascader :options="options" @change="handleChange"></el-cascader>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const props = defineProps({
    /**数据查询方法 */
    action: {
      type: Function,
      required: true,
    },
  })

  const emit = defineEmits(['change'])

  const options = ref<Array<any>>([])
  const allOptions = ref<Array<any>>([])

  const resolveAllOptions = (opts: any) => {
    if (opts && opts.length > 0) {
      opts.forEach((o: any) => {
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

  const handleChange = (val: any) => {
    let opt = allOptions.value.find((m) => m.value === val)
    emit('change', val, opt)
  }

  defineExpose({ refresh })
</script>
