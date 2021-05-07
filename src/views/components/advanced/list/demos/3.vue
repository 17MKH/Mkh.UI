<template>
  <div style="height: 400px">
    <mu-list title="诗词列表" :cols="cols" :query-model="model" :query-method="query">
      <template #querybar>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="model.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input v-model="model.author" clearable></el-input>
        </el-form-item>
        <el-form-item label="朝代：" prop="dynasty">
          <el-select v-model="model.dynasty" clearable>
            <el-option label="唐代" value="唐代"></el-option>
            <el-option label="宋代" value="宋代"></el-option>
            <el-option label="元代" value="元代"></el-option>
            <el-option label="明代" value="明代"></el-option>
            <el-option label="清代" value="清代"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template #toolbar>
        <mu-button icon="plus" @click="handleCustomButton" />
      </template>
    </mu-list>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref } from 'vue'
import { query } from './api'
export default {
  setup() {
    const { $alert } = getCurrentInstance().proxy
    const model = reactive({ name: '', author: '', dynasty: '' })
    const cols = ref([
      { prop: 'id', label: '编号', width: '55', show: false },
      {
        prop: 'name',
        label: '名称',
      },
      { prop: 'author', label: '作者' },
      { prop: 'dynasty', label: '朝代' },
      { prop: 'type', label: '类型' },
    ])

    const handleCustomButton = () => {
      $alert('您点击了自定义按钮~', '提示', {
        confirmButtonText: '确定',
      })
    }

    return {
      model,
      cols,
      query,
      handleCustomButton,
    }
  },
}
</script>
