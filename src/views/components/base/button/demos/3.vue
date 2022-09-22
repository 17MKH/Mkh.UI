<template>
  <el-row>
    <m-button-delete :action="del"></m-button-delete>
    <m-button-delete :action="del" type="danger"></m-button-delete>
  </el-row>
</template>
<script setup lang="ts">
  const del = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })
  }
</script>
