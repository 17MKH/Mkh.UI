<template>
  <el-tooltip :effect="effect" :content="content" :placement="placement">
    <m-icon name="question" class="m-text-warning m-font-16 m-margin-lr-3"></m-icon>
  </el-tooltip>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
    },
    effect: {
      type: String,
      default: 'dark',
    },
  },
}
</script>
