<template>
  <m-form-dialog :model="model" :rules="rules" v-bind="form.props" v-on="form.on">
    <el-row>
      <el-col>
        <el-form-item :label="t('mkh.login.username')" prop="username">
          <el-input v-model="model.username" />
        </el-form-item>
        <el-form-item :label="t('mod.doc.name')" prop="name">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item label="测试" prop="name">
          <el-table :data="model.list" border style="width: 100%; height: 100%">
            <el-table-column label="name" prop="name" min-width="150">
              <template #default="{ row }">
                <el-input v-model="row.name" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="测试" prop="name">
          <m-button type="success" @click="test">新增</m-button>
        </el-form-item>
      </el-col>
    </el-row>
  </m-form-dialog>
</template>
<script setup lang="ts">
  import { computed, Ref, ref } from 'vue'
  import { ActionMode, useAction } from '@/composables'
  import { useI18n } from '#/locales'
  import api from '#/api/account'

  const { t } = useI18n()

  const props = defineProps<{ id?: number; mode: ActionMode }>()

  const emit = defineEmits()

  const model: Ref<any> = ref({ username: '', name: '', list: [] })

  const rules = computed(() => {
    return {
      username: [{ required: true, message: t('mod.doc.input_username') }],
      name: [{ required: true, message: t('mod.doc.input_name') }],
    }
  })

  const { form } = useAction({
    props,
    emit,
    api,
    model,
    afterReset: () => {},
  })

  const test = () => {
    console.log(model.value)
    model.value.list.push({ name: new Date().getMilliseconds() })

    console.log(model.value.list)
  }
</script>
