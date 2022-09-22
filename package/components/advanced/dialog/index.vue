<template>
  <el-dialog
    ref="dialogRef"
    v-model="visible"
    :width="width"
    :class="class_"
    :top="top"
    :show-close="false"
    :modal="modal"
    :append-to-body="appendToBody"
    :draggable="draggable"
    :lock-scroll="lockScroll"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    @open-auto-focus="handleOpenAutoFocus"
    @close-auto-focus="handleCloseAutoFocus"
  >
    <!--头部-->
    <template v-if="header" #header>
      <m-head ref="headerRef" class="m-dialog_header" :title="title" :icon="icon" :icon-color="iconColor" :size="size">
        <slot name="title"></slot>
        <template #toolbar>
          <!--工具栏插槽-->
          <slot name="toolbar" />
          <!--全屏按钮-->
          <m-button v-if="showFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
          <!--关闭按钮-->
          <m-button v-if="showClose" icon="close" @click="close" />
        </template>
      </m-head>
    </template>

    <div
      v-loading="loading"
      class="m-dialog_content"
      :element-loading-text="loadingText || $t('mkh.loading_text')"
      :element-loading-background="loadingBackground"
      :element-loading-spinner="loadingSpinner"
    >
      <!--内容-->
      <div class="m-dialog_body" :style="{ height: contentHeight + 'px' }">
        <div ref="wrapperRef" class="m-dialog_wrapper">
          <slot v-if="noScrollbar"></slot>
          <m-scrollbar v-else ref="scrollbarRef">
            <slot />
          </m-scrollbar>
        </div>
      </div>
      <!--尾部-->
      <footer v-if="$slots.footer" ref="footerRef" class="m-dialog_footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </el-dialog>
</template>
<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>
<script setup lang="ts">
  import { computed, nextTick, ref } from 'vue'
  import { useVisible, useFullscreen } from '@/composables'
  import dom from '@/utils/dom'
  import propsDefinition from './props'

  const props = defineProps(propsDefinition)
  const emit = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed', 'open-auto-focus', 'close-auto-focus', 'fullscreen-change'])

  const { visible, open, close } = useVisible(props, emit)

  //全屏操作
  const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)

  const class_ = computed(() => {
    const { customClass, noPadding, noScrollbar, height } = props

    let classList = ['m-dialog']
    if (props.size) classList.push(props.size)
    if (noPadding) classList.push('no-padding')
    if (noScrollbar) classList.push('no-scrollbar')
    if (height) classList.push('has-height')
    if (isFullscreen.value) classList.push('is-fullscreen')
    if (customClass) {
      classList.push(props.customClass)
    }
    return classList.join(' ')
  })

  //标注是否在重置大小中
  const resizing = ref(false)

  const dialogRef = ref()
  const headerRef = ref()
  const footerRef = ref()
  const scrollbarRef = ref()
  const wrapperRef = ref()
  const contentHeight = ref(0)

  let headAndFooterHeight = 0

  /**
   * 重绘窗口尺寸
   */
  const resize = () => {
    if (resizing.value) return
    resizing.value = true

    const { height } = props
    // 如果主动设置了高度
    if (height) {
      let h = 0
      if (typeof height === 'number' && height > 0) {
        h = height
      } else if (typeof height === 'string' && height.endsWith('px')) {
        h = parseFloat(height.replace('px', ''))
      } else if (typeof height === 'string' && height.endsWith('%')) {
        h = (document.body.clientHeight * parseFloat(height.replace('%', ''))) / 100
      }

      contentHeight.value = h - headAndFooterHeight
    } else {
      contentHeight.value = props.noScrollbar ? wrapperRef.value.offsetHeight : scrollbarRef.value.$el.querySelector('.el-scrollbar__view').offsetHeight
    }

    //内容区域最大高度，不能超出body
    let contentMaxHeight = document.body.clientHeight - headAndFooterHeight - 100
    if (contentHeight.value > contentMaxHeight) {
      contentHeight.value = contentMaxHeight
    }
    //更新滚动条
    if (!props.noScrollbar) {
      scrollbarRef.value.update()
    }

    resizing.value = false
  }

  const handleOpen = () => {
    nextTick(() => {
      headAndFooterHeight = headerRef.value.$el.offsetHeight
      if (footerRef.value != null) {
        headAndFooterHeight += footerRef.value.offsetHeight
      }

      resize()

      dom.on(window, 'resize', resize)
    })

    emit('open')
  }

  const handleOpened = () => {
    emit('opened')
  }

  const handleClose = () => {
    emit('close')
  }

  const handleClosed = () => {
    dom.off(window, 'resize', resize)
    emit('closed')
  }

  const handleOpenAutoFocus = () => {
    emit('open-auto-focus')
  }

  const handleCloseAutoFocus = () => {
    emit('open-auto-focus')
  }

  defineExpose({
    open,
    close,
    resize,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
  })
</script>
