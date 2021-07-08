<template>
  <m-container>
    <m-list ref="listRef" title="角色列表" :cols="cols" :query-model="model" :query-method="query">
      <template #querybar>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="model.name" clearable></el-input>
        </el-form-item>
      </template>
      <template #querybar-buttons>
        <m-button type="success" icon="plus" text="添加" @click="add" />
      </template>
      <template #operation="{ row }">
        <m-button type="text" text="编辑" icon="edit" @click="edit(row)" />
        <m-button type="text" text="预览" icon="preview" @click="view(row)" />
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
