<template>
  <m-button class="m-button-add" :type="type" :icon="icon" :text="text === null ? $t('mkh.add.text') : ''">
    <slot />
  </m-button>
</template>
<script>
export default {
  name: 'ButtonAdd',
  props: {
    /** 类型 primary/success/warning/danger/info/text */
    type: {
      type: String,
      default: 'success',
    },
    /** 图标 */
    icon: {
      type: String,
      default: 'plus',
    },
    /** 文本 */
    text: {
      type: String,
      default: null,
    },
  },
}
</script>
