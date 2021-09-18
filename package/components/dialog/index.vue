<template>
  <el-dialog
    ref="elDialogRef"
    v-model="visible"
    :custom-class="class_"
    :show-close="false"
    :width="width"
    :modal="modal"
    :close-on-click-modal="closeOnClickModal"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
    :lock-scroll="lockScroll"
    :append-to-body="appendToBody"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <!--头部-->
    <template v-if="header" #title>
      <m-head class="m-dialog_header" :icon="icon" :icon-color="iconColor" :size="size">
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
      :element-loading-text="loadingText || $t('mkh.dialog.loadingText')"
      :element-loading-background="loadingBackground"
      :element-loading-spinner="loadingSpinner"
    >
      <!--内容-->
      <div class="m-dialog_body">
        <div class="m-dialog_wrapper">
          <slot v-if="noScrollbar"></slot>
          <m-scrollbar v-else>
            <slot />
          </m-scrollbar>
        </div>
      </div>
      <!--尾部-->
      <footer v-if="$slots.footer" class="m-dialog_footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </el-dialog>
</template>
<script>
import { computed, nextTick, ref } from 'vue'
import { useVisible, useFullscreen } from '../../composables'
import { addResizeListener, removeResizeListener } from 'element-plus/packages/utils/resize-event'
import dom from '../../utils/dom'
import props from './props'
export default {
  name: 'Dialog',
  props,
  emits: ['update:modelValue', 'open', 'opened', 'close', 'closed'],
  setup(props, { emit }) {
    const { store } = mkh

    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)

    const draggable = computed(() => {
      return props.draggable !== null ? props.draggable : store.state.app.config.component.dialog.draggable
    })

    //使用当前时间戳创建唯一ID
    const class_ = computed(() => {
      const { customClass, noPadding, noScrollbar } = props

      let classList = ['m-dialog', `m-dialog-${new Date().getTime()}`]
      if (props.size) classList.push(props.size)
      if (noPadding) classList.push('no-padding')
      if (noScrollbar) classList.push('no-scrollbar')
      if (draggable.value) classList.push('draggable')
      if (isFullscreen.value) classList.push('is-fullscreen')
      if (customClass) classList.push(props.customClass)

      return classList.join(' ')
    })

    //标注是否在重置大小中
    const resizing = ref(false)

    const elDialogRef = ref(null)
    let dialogEl = null
    let headerEl = null
    let footerEl = null
    let scrollbarEl = null
    let wrapperEl = null
    let dragDownState = null
    let headerHeight = 0
    let footerHeight = 0

    /**
     * 重绘窗口尺寸
     */
    const resize = () => {
      if (resizing.value) return
      resizing.value = true

      nextTick(() => {
        headerHeight = headerEl.offsetHeight
        footerHeight = footerEl != null ? footerEl.offsetHeight : 0

        let viewHeight = props.noScrollbar ? wrapperEl.offsetHeight : scrollbarEl.offsetHeight
        let height = viewHeight + headerHeight + footerHeight
        let top = 0
        //默认高度不能超出body
        if (height > document.body.clientHeight - 100) {
          height = document.body.clientHeight - 100
          top = 50
        } else {
          top = (document.body.clientHeight - height) / 2
        }

        if (top > 200) {
          top = 200
        }

        dialogEl.style.height = height + 'px'

        if (draggable.value) {
          dialogEl.style.top = top + 'px'
        } else {
          dialogEl.style.marginTop = top + 'px'
        }
        resizing.value = false
      })
    }

    const handleOpen = () => {
      nextTick(() => {
        dialogEl = elDialogRef.value.dialogRef
        headerEl = dialogEl.querySelector('.el-dialog__header')
        footerEl = dialogEl.querySelector('.m-dialog_footer')
        scrollbarEl = dialogEl.querySelector('.el-scrollbar__view')
        wrapperEl = dialogEl.querySelector('.m-dialog_wrapper')

        //开启拖拽功能，先计算初始坐标再计算大小
        if (draggable.value) {
          //拖拽模式对话框的定位会设置为fixed模式，所以需要重新计算对话框的left属性
          dialogEl.style.left = (document.body.offsetWidth - dialogEl.offsetWidth) / 2 + 'px'

          dom.on(headerEl, 'mousedown', handleDragDown)
        }

        dom.on(window, 'resize', resize)

        addResizeListener(props.noScrollbar ? wrapperEl : scrollbarEl, resize)
      })

      emit('open')
    }

    const handleOpened = () => {
      emit('opened')
    }

    const handleClose = () => {
      emit('close')

      //关闭window窗口大小改变事件
      if (!props.height) dom.off(window, 'resize', resize)

      removeResizeListener(props.noScrollbar ? wrapperEl : scrollbarEl, resize)
    }

    const handleClosed = () => {
      emit('closed')
    }

    const handleDragDown = e => {
      //开启拖拽并且不是全屏模式的情况才可以拖拽
      if (draggable.value && !isFullscreen.value) {
        dragDownState = e

        dom.on(document, 'mousemove', handleDragMove)
        dom.on(document, 'mouseup', handleDragUp)
      }
    }

    const handleDragMove = e => {
      const { dragOutPage, dragMinWidth } = props
      let left = dialogEl.offsetLeft + (e.clientX - dragDownState.clientX)
      let top = dialogEl.offsetTop + (e.clientY - dragDownState.clientY)
      let leftMax = document.body.offsetWidth - dialogEl.offsetWidth
      let leftMin = 0
      let topMax = document.body.offsetHeight - dialogEl.offsetHeight
      let topMin = 0

      if (dragOutPage) {
        leftMax = document.body.offsetWidth - dragMinWidth
        leftMin = -dialogEl.offsetWidth + dragMinWidth
        topMax = document.body.offsetHeight - headerHeight
      }

      dialogEl.style.left = Math.max(leftMin, Math.min(left, leftMax)) + 'px'
      dialogEl.style.top = Math.max(topMin, Math.min(top, topMax)) + 'px'

      dragDownState = e
    }

    const handleDragUp = e => {
      dom.off(document, 'mousemove', handleDragMove)
      dom.off(document, 'mouseup', handleDragUp)
    }

    return {
      ...useVisible(props, emit),
      elDialogRef,
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
