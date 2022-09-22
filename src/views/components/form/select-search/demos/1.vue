<template>
  <m-form>
    <el-form-item label="选择账户">
      <m-select-search v-model="value" :action="query" />
    </el-form-item>
  </m-form>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('')
  const users = [
    { label: '张三', value: 1 },
    { label: '李四', value: 2 },
  ]
  const query = (keyword) => {
    console.log(keyword)
    return new Promise((resolve) => {
      resolve(users.filter((m) => m.label.indexOf(keyword) > -1))
    })
  }
</script>
