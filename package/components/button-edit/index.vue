<template>
  <m-button class="m-button-edit" :type="type" :text="text" :icon="icon">
    <slot>
      {{ $t('mkh.edit') }}
    </slot>
  </m-button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    text: {
      type: Boolean,
      default: true,
    },
    /** 图标 */
    icon: {
      type: String,
      default: 'edit',
    },
  },
}
</script>
