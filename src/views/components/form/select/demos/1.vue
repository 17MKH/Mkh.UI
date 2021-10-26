<template>
  <m-form label-width="150px">
    <el-form-item label="选择账户">
      <m-select v-model="value" :action="query" @change="handleChange" />
    </el-form-item>
    <el-form-item label="可清空">
      <m-select v-model="value1" :action="query" clearable @change="handleChange" />
    </el-form-item>
    <el-form-item label="默认选中第一个">
      <m-select v-model="value2" :action="query" checked-first @change="handleChange" />
    </el-form-item>
    <el-form-item label="手动刷新">
      <m-select ref="selectRef" v-model="value3" :action="query" @change="handleChange" />
      <m-button icon="refresh" @click="() => selectRef.query()" />
    </el-form-item>
    <el-form-item label="是否">
      <m-select-whether v-model="value4" />
    </el-form-item>
  </m-form>
</template>
<script setup>
import { ref } from 'vue'
const value = ref([])
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const selectRef = ref(null)

const query = () => {
  return new Promise(resolve => {
    resolve([
      { label: '张三', value: 1 },
      { label: '李四', value: 2 },
    ])
  })
}

const handleChange = val => {
  console.log(val)
}
</script>
