<template>
  <el-select :placeholder="$t('mkh.select.placeholder')">
    <el-option :label="$t('mkh.whether.yes')" :value="true"> </el-option>
    <el-option :label="$t('mkh.whether.no')" :value="false"> </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'SelectWhether',
}
</script>
