<template>
  <div ref="containerRef" class="m-drag-sort">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import Sortable from 'sortablejs'
  import { onMounted, ref } from 'vue'
  const props = defineProps({
    modelValue: {
      type: Array,
      default() {
        return []
      },
    },
    handle: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const containerRef = ref()

  onMounted(() => {
    new Sortable(containerRef.value, {
      handle: props.handle,
      onSort(evt) {
        var newList = [...props.modelValue]
        newList.splice(evt.newIndex as number, 0, newList.splice(evt.oldIndex as number, 1)[0])
        emit('update:modelValue', newList)
      },
    })
  })
</script>
