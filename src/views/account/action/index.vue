<template>
  <m-form-dialog title="新增" icon="plus" :model="model" :rules="rules" :action="api.add">
    <el-form-item :label="t('mkh.login.username')" prop="username">
      <el-input v-model="model.username" />
    </el-form-item>
    <el-form-item :label="t('mod.doc.name')" prop="name">
      <el-input v-model="model.name" />
    </el-form-item>
  </m-form-dialog>
</template>
<script setup lang="ts">
  import { reactive } from 'vue'
  import { useI18n } from '#/locales'
  import api from '#/api/account'

  const { t } = useI18n()

  const model = reactive({ username: '', name: '' })
  const rules = {
    username: [{ required: true, message: t('mod.doc.input_username') }],
    name: [{ required: true, message: t('mod.doc.input_name') }],
  }
</script>
