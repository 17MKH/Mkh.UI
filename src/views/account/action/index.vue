<template>
  <m-form-dialog :model="model" :rules="rules" v-bind="form.props" v-on="form.on">
    <el-form-item :label="t('mkh.login.username')" prop="username">
      <el-input v-model="model.username" />
    </el-form-item>
    <el-form-item :label="t('mod.doc.name')" prop="name">
      <el-input v-model="model.name" />
    </el-form-item>
  </m-form-dialog>
</template>
<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import { useAction } from '@/composables'
  import { useI18n } from '#/locales'
  import api from '#/api/account'

  const { t } = useI18n()

  const props = defineProps({
    id: {
      type: Number,
    },
    mode: {
      type: String,
      default: 'add',
    },
  })
  const emit = defineEmits()

  const model = reactive({ username: '', name: '' })

  const rules = computed(() => {
    return {
      username: [{ required: true, message: t('mod.doc.input_username') }],
      name: [{ required: true, message: t('mod.doc.input_name') }],
    }
  })

  const { form } = useAction({ props, emit, api, model })
</script>
