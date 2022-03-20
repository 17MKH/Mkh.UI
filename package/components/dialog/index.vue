<template>
  <el-dialog ref="dialogRef" :custom-class="class_" :top="top" :show-close="false" :draggable="draggable" @open="handleOpen" @opened="handleOpened" @close="handleClose" @closed="handleClosed">
    <!--头部-->
    <template v-if="header" #title>
      <m-head ref="headerRef" class="m-dialog_header" :icon="icon" :icon-color="iconColor" :size="size">
        <slot name="title">{{ title }}</slot>
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
<script>
import { computed, nextTick, ref } from 'vue'
import { useVisible, useFullscreen } from '../../composables'
import dom from '../../utils/dom'
import props from './props'
export default {
  props,
  emits: ['open', 'opened', 'close', 'closed'],
  setup(props, { emit }) {
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
      if (customClass) classList.push(props.customClass)
      return classList.join(' ')
    })

    //标注是否在重置大小中
    const resizing = ref(false)

    const dialogRef = ref(null)
    const headerRef = ref(null)
    const footerRef = ref(null)
    const scrollbarRef = ref(null)
    const wrapperRef = ref(null)
    const contentHeight = ref(0)

    let headAndFooterHeight = 0

    /**
     * 重绘窗口尺寸
     */
    const resize = () => {
      if (resizing.value) return
      resizing.value = true

      nextTick(() => {
        const { height } = props
        // 如果主动设置了高度
        if (height) {
          let h = 0
          if (typeof height === 'number' && height > 0) {
            h = height
          } else if (height.endsWith('px')) {
            h = parseFloat(height.replace('px', ''))
          } else if (height.endsWith('%')) {
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

        resizing.value = false
      })
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
      dom.off(window, 'resize', resize)
      emit('close')
    }

    const handleClosed = () => {
      emit('closed')
    }

    return {
      ...useVisible(props, emit),
      dialogRef,
      headerRef,
      footerRef,
      scrollbarRef,
      wrapperRef,
      contentHeight,
      class_,
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      handleOpen,
      handleOpened,
      handleClose,
      handleClosed,
      resize,
    }
  },
}
</script>
