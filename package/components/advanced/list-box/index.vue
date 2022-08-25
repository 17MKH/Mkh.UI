<template>
  <m-box page class="m-list-box" :header="header" no-padding>
    <template #toolbar>
      <slot name="toolbar"></slot>
    </template>
    <m-flex-row v-for="item in rows" :key="item[options.key]" :class="['m-list-box_item', selection === item[options.key] ? 'active' : '']" @click="handleChange(item)">
      <m-flex-auto>
        <slot name="label" :item="item">
          <span>{{ item[options.label || 'name'] }}</span>
        </slot>
      </m-flex-auto>
      <m-flex-fixed>
        <slot name="action" :item="item"></slot>
      </m-flex-fixed>
    </m-flex-row>
  </m-box>
</template>
<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: null,
    },
    /** 显示头部 */
    header: {
      type: Boolean,
      default: true,
    },
    action: {
      type: Function,
      required: true,
    },
    options: {
      type: Object,
      default() {
        return {
          key: 'id',
          label: 'name',
        }
      },
    },
  })

  const emit = defineEmits(['update:modelValue', 'change'])
  const rows = ref([])
  const selection = ref()

  watchEffect(() => {
    selection.value = props.modelValue
  })

  const refresh = () => {
    props.action().then((data: any) => {
      rows.value = data
      if (data.length > 0) {
        handleChange(data[0])
      }
    })
  }
  refresh()

  const handleChange = (item: any) => {
    selection.value = item[props.options.key]
    emit('update:modelValue', selection.value)
    emit('change', selection.value, item)
  }

  defineExpose({
    refresh,
  })
</script>
