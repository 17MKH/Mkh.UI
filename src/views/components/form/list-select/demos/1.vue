<template>
  <m-form label-width="150px">
    <el-form-item label="选择账户">
      <m-list-select v-model="value" :cols="cols" :query-method="query" :query-model="queryModel">
        <template #querybar>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="queryModel.name" clearable></el-input>
          </el-form-item>
        </template>
      </m-list-select>
    </el-form-item>
  </m-form>
</template>
<script setup>
import { reactive, ref } from '@vue/reactivity'
import { query } from '../../../advanced/list/demos/api'
const value = ref('')
const cols = [
  { prop: 'id', label: '编号', width: '55', show: false },
  { prop: 'name', label: '名称' },
]
const queryModel = reactive({ name: '' })

const handleChange = val => {
  console.log(val)
}
</script>
