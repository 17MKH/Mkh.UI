<template>
  <div class="m-list-select">
    <el-input :model-value="model.label" class="m-list-select_input" readonly clearable>
      <template #suffix>
        <m-icon name="search" class="el-input__icon" @click="showDialog = true"></m-icon>
      </template>
    </el-input>
    <m-dialog v-model="showDialog" title="选择用户" icon="user" no-padding :width="dialogWidth" :height="dialogHeight" no-scrollbar custom-class="m-list-select_dialog">
      <m-list
        :header="false"
        :cols="cols"
        :query-model="queryModel"
        :query-method="queryMethod"
        :pagination="pagination"
        :show-search-btn="showSearchBtn"
        :multiple="multiple"
        :search-btn-text="searchBtnText"
        :reset-btn-text="resetBtnText"
        :no-querybar="noQuerybar"
        :before-query="beforeQuery"
        disable-set-column
        highlight-current-row
        pagination-on-right
        :stripe="false"
      >
        <template #querybar>
          <slot name="querybar"></slot>
        </template>
        <template #footer>
          <m-button type="success">{{ t('mkh.save') }}</m-button>
          <m-button type="info" @click="showDialog = false">{{ t('mkh.cancel') }}</m-button>
        </template>
      </m-list>
    </m-dialog>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import propsDefinition from './props'
  import { useI18n } from '@/composables/i18n'
  defineProps(propsDefinition)
  const { t } = useI18n()
  const showDialog = ref(false)
  const model = reactive({ label: '', value: '' })
</script>
