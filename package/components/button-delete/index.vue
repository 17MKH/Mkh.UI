<template>
  <m-button class="m-button-delete" :icon="icon" :text="text || $t('mkh.delete')" @click.stop="handleClick"> </m-button>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { useLoading, useMessage } from '../../composables'
export default {
  props: {
    /** 图标 */
    icon: {
      type: String,
      default: 'delete',
    },
    /** 文本 */
    text: {
      type: String,
      default: null,
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
  },
  emits: ['success', 'error'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const message = useMessage()

    const loading = useLoading()

    const handleClick = () => {
      const { $t } = cit
      message
        .confirm(props.msg || $t('mkh.delete_confirm_msg'), $t('mkh.delete_confirm_title'), {
          confirmButtonText: $t('mkh.ok'),
          cancelButtonText: $t('mkh.cancel'),
        })
        .then(() => {
          loading.open($t('mkh.delete_loading'))
          props
            .action(props.data)
            .then(() => {
              message.success($t('mkh.delete_success'))
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

    return {
      handleClick,
    }
  },
}
</script>
