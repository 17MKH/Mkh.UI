<template>
  <m-container>
    <m-list ref="listRef" :title="t(`routes.${page.name}`)" :icon="page.icon" :cols="cols" :query-model="model" :query-method="api.query">
      <template #querybar>
        <el-form-item :label="t('mkh.login.username')" prop="username">
          <el-input v-model="model.username" clearable />
        </el-form-item>
        <el-form-item :label="t('mod.doc.name')" prop="name">
          <el-input v-model="model.name" clearable />
        </el-form-item>
        <el-form-item :label="t('mkh.phone')" prop="phone">
          <el-input v-model="model.phone" clearable />
        </el-form-item>
      </template>
      <template #buttons>
        <m-button-add :code="page.buttons!.add.code" @click="handleAdd" />
      </template>
      <template #operation="{ row }">
        <m-button-edit :code="page.buttons!.edit.code" @click="handleEdit(row)" @success="refresh"></m-button-edit>
        <m-button-delete :code="page.buttons!.remove.code" :action="api.remove" :data="row.id" @success="refresh"></m-button-delete>
      </template>
    </m-list>
  </m-container>
</template>
<script setup lang="ts">
  import { useEntityBaseCols } from '@/index'
  import { reactive, ref } from 'vue'
  import page from './page'
  import api from '#/api/account'
  import { useI18n } from '#/locales'

  const { t } = useI18n()

  //列表组件引用
  const listRef = ref(null)
  //当前操作选择的列
  const selection = ref()

  const model = reactive({ username: '', name: '', phone: '' })
  const cols = [{ prop: 'id', label: 'mkh.id', width: '55', show: false }, { prop: 'username', label: 'mkh.login.username' }, { prop: 'name', label: 'mod.doc.name' }, ...useEntityBaseCols()]

  const handleAdd = () => {}

  const handleEdit = (row) => {}

  const refresh = () => {}
</script>
