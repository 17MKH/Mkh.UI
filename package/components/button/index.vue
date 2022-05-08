<template>
  <el-button
    v-m-has="code"
    class="m-button"
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handleClick"
  >
    <m-icon v-if="!loading && icon" :name="icon" />
    <slot>
      <span v-if="!circle && text" class="m-button_text">
        {{ text }}
      </span>
    </slot>
  </el-button>
</template>
<script>
import props from './props'
export default {
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const { router } = mkh

    const handleClick = event => {
      if (props.to) {
        router.push(props.to)
      } else {
        emit('click', event)
      }
    }

    return {
      handleClick,
    }
  },
}
</script>
