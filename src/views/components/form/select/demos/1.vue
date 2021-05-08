<template>
  <mu-form label-width="150px">
    <el-form-item label="选择账户">
      <mu-select v-model="value" :action="query" @change="handleChange" />
    </el-form-item>
    <el-form-item label="可清空">
      <mu-select v-model="value1" :action="query" clearable @change="handleChange" />
    </el-form-item>
    <el-form-item label="默认选中第一个">
      <mu-select v-model="value2" :action="query" checked-first @change="handleChange" />
    </el-form-item>
    <el-form-item label="手动刷新">
      <mu-select ref="selectRef" v-model="value3" :action="query" @change="handleChange" />
      <mu-button icon="refresh" @click="() => selectRef.query()" />
    </el-form-item>
  </mu-form>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value = ref('')
    const value1 = ref('')
    const value2 = ref('')
    const value3 = ref('')
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

    return {
      value,
      value1,
      value2,
      value3,
      selectRef,
      query,
      handleChange,
    }
  },
}
</script>
