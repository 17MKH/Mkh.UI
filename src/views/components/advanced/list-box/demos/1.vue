<template>
  <div style="height: 400px">
    <m-flex-row>
      <m-flex-fixed width="300px">
        <m-list-box v-model="value" title="诗词列表" :action="query">
          <template #action="{ item }">
            <m-button icon="edit" @click.stop="edit(item)">编辑</m-button>
          </template>
        </m-list-box>
      </m-flex-fixed>
      <m-flex-auto class="m-padding-10">
        <p>当前选择值：{{ value }}</p>
        <p>当前编辑项：{{ current }}</p>
      </m-flex-auto>
    </m-flex-row>
  </div>
</template>
<script>
import { ref } from 'vue'
import { query } from './api'
export default {
  setup() {
    const value = ref()
    const current = ref()
    const edit = item => {
      current.value = item
    }
    return {
      value,
      query,
      edit,
      current,
    }
  },
}
</script>
