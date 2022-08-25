<template>
  <div class="m-box-small" :style="{ backgroundColor: color }">
    <div class="m-box-small_content">
      <slot>
        <div class="m-box-small_value">
          <span>{{ value }}</span>
          <span class="m-box-small_unit">{{ unit }}</span>
        </div>
        <div v-if="label" class="m-box-small_label">{{ label }}</div>
      </slot>
    </div>
    <div class="m-box-small_icon"><m-icon v-if="icon" :name="icon" /></div>
    <div v-if="more" class="m-box-small_more" @click="handleMore">
      {{ t('mkh.more') }}
      <m-icon name="arrow-right" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useI18n } from '@/composables/i18n'

  const props = defineProps({
    /** 文本 */
    label: {
      type: String,
      default: '',
    },
    /** 值 */
    value: {
      type: [String, Number],
      default: '',
    },
    /** 单位 */
    unit: {
      type: String,
      default: '',
    },
    /** 图标 */
    icon: {
      type: String,
      default: '',
    },
    /** 背景色 */
    color: {
      type: String,
      default: '',
    },
    /** 显示更多 */
    more: Boolean,
  })

  const emit = defineEmits(['more'])

  const { t } = useI18n()

  const handleMore = () => {
    emit('more')
  }
</script>
