<template>
  <m-form>
    <el-row>
      <el-col :span="12">
        <el-form-item label="选择图标">
          <m-icon-picker v-model="icon" />
        </el-form-item>
      </el-col>
    </el-row>
  </m-form>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const icon = ref('')
</script>
