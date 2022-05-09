<template>
  <m-container>
    <m-list ref="listRef" title="角色列表" :cols="cols" :query-model="model" :query-method="query">
      <template #querybar>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="model.name" clearable></el-input>
        </el-form-item>
      </template>
      <template #buttons>
        <m-button type="success" icon="plus" @click="add">添加</m-button>
      </template>
      <template #operation="{ row }">
        <m-button text icon="edit" @click="edit(row)">编辑</m-button>
        <m-button text icon="preview" @click="view(row)">预览</m-button>
      </template>
    </m-list>
    <save :id="selection.id" v-model="saveVisible" :mode="mode" @success="refresh" />
  </m-container>
</template>
<script>
import { reactive, ref } from 'vue'
import { useList } from 'mkh-ui'
import Save from '../save/index.vue'
export default {
  components: { Save },
  setup() {
    const { query } = mkh.api.admin.role
    const model = reactive({ name: '' })
    const cols = ref([
      { prop: 'id', label: '编号', width: '55', show: false },
      { prop: 'name', label: '名称' },
      { prop: 'code', label: '编码' },
      { prop: 'remarks', label: '备注' },
    ])

    return {
      ...useList(),
      model,
      cols,
      query,
    }
  },
}
</script>
