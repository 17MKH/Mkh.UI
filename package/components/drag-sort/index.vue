<template>
  <div ref="containerRef" class="mu-drag-sort">
    <slot />
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import { onMounted, ref } from 'vue'
export default {
  name: 'DragSort',
  props: {
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
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const containerRef = ref(null)
    let sortable

    onMounted(() => {
      sortable = new Sortable(containerRef.value, {
        handle: props.handle,
        onSort(evt) {
          var newList = [...props.modelValue]
          newList.splice(evt.newIndex, 0, newList.splice(evt.oldIndex, 1)[0])
          ctx.emit('update:modelValue', newList)
        },
      })
    })

    return {
      containerRef,
      sortable,
    }
  },
}
</script>
