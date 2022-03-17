<template>
  <i :class="['el-icon', 'm-icon', input ? 'el-input__icon' : '']">
    <svg :class="iconClass" aria-hidden="true" :style="{ fontSize: size }">
      <use :xlink:href="`#m-${name}`" />
    </svg>
  </i>
</template>

<script>
import('./iconfont')

export default {
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
    /** 尺寸 */
    size: {
      type: String,
      default: '',
    },
    /** 是否是输入框中的图表 */
    input: {
      type: Boolean,
    },
  },
}
</script>
