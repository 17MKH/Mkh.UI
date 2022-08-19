<template>
  <el-select :placeholder="t('mkh.please_select')">
    <el-option :label="t('mkh.yes')" :value="true"> </el-option>
    <el-option :label="t('mkh.no')" :value="false"> </el-option>
  </el-select>
</template>
<script setup lang="ts">
  import { useI18n } from '@/composables/i18n'
  const { t } = useI18n()
</script>
