<template>
  <m-form>
    <el-form-item label="选择账户">
      <m-select-search v-model="value" :action="query" />
    </el-form-item>
  </m-form>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value = ref('')
    const users = [
      { label: '张三', value: 1 },
      { label: '李四', value: 2 },
    ]
    const query = keyword => {
      console.log(keyword)
      return new Promise(resolve => {
        resolve(users.filter(m => m.label.indexOf(keyword) > -1))
      })
    }

    return {
      value,
      query,
    }
  },
}
</script>
