<template>
  <el-button
    class="mu-button"
    :type="type"
    :size="size_"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handleClick"
  >
    <mu-icon v-if="!loading && icon" :name="icon" />
    <slot>
      <span v-if="!circle && text" class="mu-button_text">
        {{ text }}
      </span>
    </slot>
  </el-button>
</template>
<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Button',
  props: {
    /** 尺寸 */
    size: {
      type: String,
      default: null,
    },
    /** 类型 primary/success/warning/danger/info/text */
    type: {
      type: String,
      default: null,
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
      default: null,
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
    /** 跳转路由，如果设置了该属性，无法再监听click事件 */
    to: {
      type: [String, Object],
      default: null,
    },
  },
  emits: ['click'],
  setup(props, ctx) {
    const router = useRouter()
    const store = useStore()

    const size_ = computed(() => props.size || store.state.app.account.skin.size)

    const handleClick = event => {
      if (props.to) {
        router.push(props.to)
      } else {
        ctx.emit('click', event)
      }
    }

    return {
      size_,
      handleClick,
    }
  },
}
</script>
