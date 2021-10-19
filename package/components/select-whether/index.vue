<template>
  <el-select :placeholder="$t('mkh.select.placeholder')">
    <el-option :label="$t('mkh.whether.yes')" value="1"> </el-option>
    <el-option :label="$t('mkh.whether.no')" value="0"> </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'SelectWhether',
}
</script>
