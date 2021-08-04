<template>
  <m-button class="m-button-edit" :icon="icon" :text="text === null ? $t('mkh.edit.text') : text">
    <slot />
  </m-button>
</template>
<script>
export default {
  name: 'ButtonEdit',
  props: {
    /** 图标 */
    icon: {
      type: String,
      default: 'edit',
    },
    /** 文本 */
    text: {
      type: String,
      default: null,
    },
  },
}
</script>
