<template>
  <el-button
    v-m-has="code"
    class="m-button"
    :type="type"
    :text="text"
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
    <template v-if="!loading && icon" #icon>
      <svg :class="iconClass" aria-hidden="true">
        <use :xlink:href="`#m-${icon}`" />
      </svg>
    </template>
    <slot> </slot>
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
