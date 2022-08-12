<template>
  <m-button class="m-button-delete" :link="link" :type="type" :text="text" :icon="icon" @click.stop="handleClick">
    <slot>
      {{ t('mkh.delete') }}
    </slot>
  </m-button>
</template>
<script lang="ts" setup>
  import { useLoading, useMessage } from '@/composables'
  import useI18n from '@/composables/i18n'

  const props = defineProps({
    type: {
      type: String,
      default: 'danger',
    },
    text: {
      type: Boolean,
      default: true,
    },
    /** 是否为链接按钮 */
    link: { type: Boolean, default: true },
    /** 图标 */
    icon: {
      type: String,
      default: 'delete',
    },
    /** 请求参数 */
    data: {
      type: [String, Number, Object],
      default: '',
    },
    /** 二次确认的消息 */
    msg: {
      type: String,
      default: '',
    },
    /** 删除方法，需返回Promise */
    action: {
      type: Function,
      required: true,
    },
  })

  const emit = defineEmits<{ (e: 'success'): void; (e: 'error'): void }>()

  const { t } = useI18n()

  const message = useMessage()
  const loading = useLoading()

  const handleClick = () => {
    message
      .confirm(props.msg || t('mkh.delete_confirm_msg'), t('mkh.delete_confirm_title'), {
        confirmButtonText: t('mkh.ok'),
        cancelButtonText: t('mkh.cancel'),
      })
      .then(() => {
        loading.open(t('mkh.delete_loading'))
        props
          .action(props.data)
          .then(() => {
            message.success(t('mkh.delete_success'))
            emit('success')
          })
          .catch(() => {
            emit('error')
          })
          .finally(() => {
            loading.close()
          })
      })
      .catch(() => {})
  }
</script>
