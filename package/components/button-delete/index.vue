<template>
  <mu-button
    class="mu-button-delete"
    :type="type"
    :size="size_"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    :icon="icon"
    :text="text || $t('mkh.delete.text')"
    :code="code"
    @click="handleClick"
  >
  </mu-button>
</template>
<script>
import { computed, getCurrentInstance } from 'vue'
import { useLoading } from '../../composables'
import { useStore } from 'vuex'
export default {
  name: 'ButtonDelete',
  props: {
    /** 尺寸，默认按照框架的字号设置 */
    size: {
      type: String,
      default: null,
    },
    /** 类型 primary/success/warning/danger/info/text */
    type: {
      type: String,
      default: 'text',
    },
    /** 是否朴素按钮 */
    plain: Boolean,
    /** 是否圆角按钮 */
    round: Boolean,
    /** 是否圆形按钮 */
    circle: Boolean,
    /** 是否加载中状态 */
    loading: Boolean,
    /** 是否禁用状态 */
    disabled: Boolean,
    /** 是否默认聚焦 */
    autofocus: Boolean,
    /** 原生 type 属性 button/submit/reset */
    nativeType: {
      type: String,
      default: 'button',
    },
    /** 图标 */
    icon: {
      type: String,
      default: 'delete',
    },
    /** 文本 */
    text: {
      type: String,
      default: '',
    },
    /** 按钮编码，用于按钮权限控制 */
    code: {
      type: String,
      default: '',
    },
    /** 请求参数 */
    data: {
      type: [String, Number],
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
  setup(props, ctx) {
    const cit = getCurrentInstance().proxy
    const { $confirm, $message, $t } = cit
    const store = useStore()
    const size_ = computed(() => props.size || store.state.app.account.skin.size)

    const loading = useLoading(cit)

    const handleClick = () => {
      $confirm(props.msg || $t('mkh.delete.msg'), $t('mkh.delete.title'), {
        type: 'warning',
        confirmButtonText: $t('mkh.delete.ok'),
        cancelButtonText: $t('mkh.delete.cancel'),
      })
        .then(() => {
          loading.open($t('mkh.delete.loading'))
          props
            .action(props.data)
            .then(() => {
              $message.success({
                message: $t('mkh.delete.success'),
                type: 'success',
              })
              ctx.emit('success')
            })
            .catch(() => {
              ctx.emit('error')
            })
            .finally(() => {
              loading.close()
            })
        })
        .catch(() => {})
    }

    return {
      size_,
      handleClick,
    }
  },
}
</script>
