<template>
  <m-doc-component-doc title="对话框组件(m-dialog)" :props="props" :events="events" :methods="methods" :slots="slots">
    <m-drag-sort v-model="list">
      <li v-for="i in list" :key="i">第{{ i }}</li>
    </m-drag-sort>
  </m-doc-component-doc>
</template>
<script>
import { ref } from 'vue'
import props from './apis/_props'
import events from './apis/_events'
import methods from './apis/_methods'
import slots from './apis/_slots'
export default {
  components: {},
  setup() {
    var list = ref([1, 2, 3, 4, 5])
    return {
      props,
      events,
      methods,
      slots,
      list,
    }
  },
}
</script>
