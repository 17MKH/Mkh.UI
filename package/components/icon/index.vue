<template>
  <svg class="m-icon" :class="iconClass" aria-hidden="true">
    <use :xlink:href="`#m-${name}`" />
  </svg>
</template>

<script>
import('./iconfont')

export default {
  name: 'Icon',
  props: {
    /** 名称 */
    name: {
      type: String,
      required: true,
    },
    /** 自定义class */
    iconClass: {
      type: String,
      default: '',
    },
  },
}
</script>
