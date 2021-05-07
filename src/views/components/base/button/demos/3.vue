<template>
  <el-row>
    <mu-button-delete :action="del"></mu-button-delete>
    <mu-button-delete :action="del" type="danger"></mu-button-delete>
  </el-row>
</template>
<script>
export default {
  setup() {
    const del = () => {
      return new Promise(resolve => {
        setTimeout(resolve, 1500)
      })
    }

    return {
      del,
    }
  },
}
</script>
