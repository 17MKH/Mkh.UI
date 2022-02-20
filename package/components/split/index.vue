<template>
  <div
    v-loading="loading"
    :class="['m-split', mode, moving ? 'no-select' : '']"
    :element-loading-text="loadingText || $t('mkh.loading_text')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <div ref="wrapperRef" class="m-split_wrapper">
      <div :style="style" class="m-split_fixed">
        <slot name="fixed" />
      </div>
      <div class="m-split_trigger" @mousedown="handleDown">
        <slot name="trigger">
          <div class="m-split_trigger_bar">
            <i v-for="i in 8" v-once :key="`trigger-${i}`"></i>
          </div>
        </slot>
      </div>
      <div class="m-split_auto">
        <slot name="auto" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, watch, ref, toRef } from 'vue'
import props from './props'
import dom from '../../utils/dom'
export default {
  props,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { store } = mkh

    const loadingOptions = store.state.app.config.component.loading

    const modelValue = toRef(props, 'modelValue')

    //标识拖动中
    const moving = ref(false)
    const wrapperRef = ref()

    //是否水平排列
    const isHorizontal = computed(() => {
      return props.mode === 'horizontal'
    })

    //单位是否是px
    const valueIsPx = computed(() => {
      return typeof props.modelValue === 'string'
    })

    //固定面板的尺寸
    const fixedSize = ref(0)

    //包装器的尺寸
    const wrapperSize = computed(() => {
      return isHorizontal.value ? wrapperRef.value.offsetWidth : wrapperRef.value.offsetHeight
    })

    //固定面板的最小尺寸
    const minSize = computed(() => {
      const { min } = props
      if (typeof min === 'string') {
        return parseFloat(min.replace('px', ''))
      } else {
        return min * wrapperSize.value
      }
    })

    //固定面板最小尺寸
    const maxSize = computed(() => {
      const { max } = props
      if (typeof max === 'string') {
        return parseFloat(max.replace('px', ''))
      } else {
        return max * wrapperSize.value
      }
    })

    //固定面板的样式
    const style = computed(() => {
      return isHorizontal.value ? { width: fixedSize.value + 'px' } : { height: fixedSize.value + 'px' }
    })

    //计算固定面板的尺寸
    const computeFixedSize = () => {
      fixedSize.value = valueIsPx.value ? parseFloat(modelValue.value.replace('px', '')) : wrapperSize.value * modelValue.value
    }

    //记录鼠标点击时的状态
    let mouseState = null
    //记录鼠标点击时的固定面板尺寸
    let initFixedSize = null
    let value_ = ''

    const handleMove = e => {
      let t = isHorizontal.value ? 'pageX' : 'pageY'
      let size = initFixedSize + e[t] - mouseState[t]
      if (size < minSize.value) {
        size = minSize.value
      } else if (size > maxSize.value) {
        size = maxSize.value
      }

      fixedSize.value = size

      value_ = valueIsPx.value ? size + 'px' : size / wrapperSize.value
      emit('update:modelValue', value_)
    }

    const handleUp = () => {
      moving.value = false
      dom.off(document, 'mousemove', handleMove)
      dom.off(document, 'mouseup', handleUp)
    }

    const handleDown = e => {
      moving.value = true
      mouseState = e
      initFixedSize = fixedSize.value
      dom.on(document, 'mousemove', handleMove)
      dom.on(document, 'mouseup', handleUp)
    }

    onMounted(() => {
      nextTick(() => {
        computeFixedSize()
      })

      window.addEventListener('resize', () => {
        computeFixedSize()
      })
    })

    watch(modelValue, val => {
      if (val !== value_) {
        computeFixedSize()
      }
    })

    return {
      loadingOptions,
      moving,
      wrapperRef,
      style,
      handleDown,
    }
  },
}
</script>
