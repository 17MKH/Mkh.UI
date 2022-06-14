<template>
  <m-button class="m-button-add" :type="type" :icon="icon">
    <slot>
      {{ $t('mkh.add') }}
    </slot>
  </m-button>
</template>
<script>
export default {
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
  },
}
</script>
