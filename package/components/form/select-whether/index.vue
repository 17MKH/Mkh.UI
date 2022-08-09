<template>
  <el-select :placeholder="$t('mkh.please_select')">
    <el-option :label="$t('mkh.yes')" :value="true"> </el-option>
    <el-option :label="$t('mkh.no')" :value="false"> </el-option>
  </el-select>
</template>
