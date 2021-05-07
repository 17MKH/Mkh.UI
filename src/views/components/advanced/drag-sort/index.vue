<template>
  <mu-container>
    <mu-doc-component-doc title="对话框组件(mu-dialog)" :props="props" :events="events" :methods="methods" :slots="slots">
      <mu-drag-sort v-model="list">
        <li v-for="i in list" :key="i">第{{ i }}</li>
      </mu-drag-sort>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import { ref } from 'vue'
import props from './_props'
import events from './_events'
import methods from './_methods'
import slots from './_slots'
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
