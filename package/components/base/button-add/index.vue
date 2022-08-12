<template>
  <m-button class="m-button-add" :type="type" :icon="icon">
    <slot>
      {{ t('mkh.add') }}
    </slot>
  </m-button>
</template>
<script setup lang="ts">
  import useI18n from '@/composables/i18n'

  const { t } = useI18n()

  defineProps({
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
  })
</script>
