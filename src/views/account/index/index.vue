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
        <m-button-add :code="page.buttons.add.code" @click="add" />
      </template>
      <template #operation="{ row }">
        <m-button-edit :code="page.buttons!.edit.code" @click="edit(row)" @success="refresh"></m-button-edit>
        <m-button-delete :code="page.buttons!.remove.code" :action="api.remove" :data="row.id" @success="refresh"></m-button-delete>
      </template>
    </m-list>
    {{ action }}
    <action v-model="action.visible" :id="selection.id" @success="refresh"></action>
  </m-container>
</template>
<script setup lang="ts">
  import { useEntityBaseCols } from '@/index'
  import { reactive, ref } from 'vue'
  import { useI18n } from '#/locales'
  import { useList } from '@/composables/list'
  import Action from '../action/index.vue'
  import page from './page'
  import api from '#/api/account'

  const { t } = useI18n()
  const {
    listRef,
    selection,
    action,
    methods: { add, edit, refresh },
  } = useList()

  const model = reactive({ username: '', name: '', phone: '' })
  const cols = [{ prop: 'id', label: 'mkh.id', width: '55', show: false }, { prop: 'username', label: 'mkh.login.username' }, { prop: 'name', label: 'mod.doc.name' }, ...useEntityBaseCols()]
</script>
