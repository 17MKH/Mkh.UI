<template>
  <div :class="['m-split_trigger', mode]">
    <div class="m-split_trigger_bar_con">
      <i v-for="i in 8" v-once :key="`trigger-${i}`" class="m-split_trigger_bar"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
}
</script>
