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
        <slot name="fixed"></slot>
      </div>
      <div class="m-split_trigger" @mousedown="handleDown">
        <slot name="trigger">
          <div class="m-split_trigger_bar">
            <i v-for="i in 8" v-once :key="`trigger-${i}`"></i>
          </div>
        </slot>
      </div>
      <div class="m-split_auto">
        <slot name="auto"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, watch, ref, toRef } from 'vue'
  import propsDefinition from './props'
  import dom from '@/utils/dom'
  import { useConfigStore } from '@/store'

  const props = defineProps(propsDefinition)
  const emit = defineEmits(['update:modelValue'])

  const configStore = useConfigStore()

  const loadingOptions = configStore.component.loading

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
    fixedSize.value = valueIsPx.value ? parseFloat((modelValue.value as string).replace('px', '')) : wrapperSize.value * (modelValue.value as number)
  }

  //记录鼠标点击时的状态
  let mouseState: MouseEvent
  //记录鼠标点击时的固定面板尺寸
  let initFixedSize: number = 0
  let value_: string | number = ''

  const handleMove = (e: MouseEvent) => {
    let size = initFixedSize

    if (isHorizontal.value) {
      size += e.pageX - mouseState.pageX
    } else {
      size += e.pageY - mouseState.pageY
    }
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

  const handleDown = (e: MouseEvent) => {
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

  watch(modelValue, (val) => {
    if (val !== value_) {
      computeFixedSize()
    }
  })
</script>
