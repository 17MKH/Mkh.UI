<template>
  <div style="height: 400px">
    <m-list title="诗词列表" :cols="cols" :query-model="model" :query-method="query" :delete-method="deleteMethod" show-delete-btn multiple>
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
      <template #buttons>
        <m-button type="success" icon="plus" @click="handleCustomButton">自定义按钮</m-button>
      </template>
      <template #operation="{ row }">
        <m-button-edit @click="handleEdit(row)">编辑</m-button-edit>
      </template>
    </m-list>
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
      { prop: 'dynasty', label: '朝代朝代', expand: true },
      { prop: 'type', label: '类型', expand: true },
    ])

    const deleteMethod = ids => {
      return new Promise(resolve => {
        resolve()
      })
    }

    const handleCustomButton = () => {
      $alert('您点击了自定义按钮~', '提示', {
        confirmButtonText: '确定',
      })
    }

    const handleEdit = row => {
      alert(`编辑列：${row.id}`)
    }

    return {
      model,
      cols,
      query,
      deleteMethod,
      handleCustomButton,
      handleEdit,
    }
  },
}
</script>
