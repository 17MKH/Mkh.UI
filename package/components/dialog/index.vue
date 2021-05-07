<template>
  <el-dialog
    ref="elDialogRef"
    v-model="visible"
    :top="top_ || top"
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
      <mu-head class="mu-dialog_header" :icon="icon" :icon-color="iconColor" :size="size">
        <slot name="title">{{ title }}</slot>
        <template #toolbar>
          <!--工具栏插槽-->
          <slot name="toolbar" />
          <!--全屏按钮-->
          <mu-button v-if="showFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
          <!--关闭按钮-->
          <mu-button v-if="showClose" icon="close" @click="close" />
        </template>
      </mu-head>
    </template>

    <div
      v-loading="loading"
      class="mu-dialog_content"
      :element-loading-text="loadingText || $t('mkh.dialog.loadingText')"
      :element-loading-background="loadingBackground || loadingOptions.background"
      :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
    >
      <!--内容-->
      <section class="mu-dialog_body">
        <slot v-if="noScrollbar" />
        <mu-scrollbar v-else>
          <slot />
        </mu-scrollbar>
      </section>
      <!--尾部-->
      <footer v-if="$slots.footer" class="mu-dialog_footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </el-dialog>
</template>
<script>
import { computed, ref } from 'vue'
import { useVisible, useFullscreen } from '../../composables'
import { on, off } from '../../utils/dom'
import { useStore } from 'vuex'
import props from './props'
export default {
  name: 'Dialog',
  props,
  emits: ['update:modelValue', 'open', 'opened', 'close', 'closed'],
  setup(props, ctx) {
    const store = useStore()
    const size_ = computed(() => props.size || store.state.app.account.skin.size)
    //默认情况下，未手动设置高度时距离顶部的距离
    const top_ = ref('')
    //加载动画配置
    const loadingOptions = MkhUI.config.component.loading

    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(ctx.emit)

    //使用当前时间戳创建唯一ID
    const class_ = computed(() => {
      const { customClass, noPadding, draggable } = props
      let classList = ['mu-dialog', `mu-dialog-${new Date().getTime()}`]
      if (size_.value) classList.push(size_.value)
      if (noPadding) classList.push('no-padding')
      if (draggable) classList.push('draggable')
      if (isFullscreen.value) classList.push('is-fullscreen')
      if (customClass) classList.push(props.customClass)

      return classList.join(' ')
    })

    //宽度值，单位px
    const widthNumber = computed(() => {
      const width = props.width
      if (width.endsWith('%')) {
        return (document.body.offsetWidth / 100) * parseInt(width.replace('%', ''))
      }

      if (width.endsWith('px')) {
        return parseInt(width.replace('%', ''))
      }

      return (document.body.offsetWidth / 100) * 50
    })
    const { visible, open, close } = useVisible(props, ctx.emit)

    const elDialogRef = ref(null)
    let dialogEl = null
    let headerEl = null
    let footerEl = null
    let dragDownState = null
    let headerHeight = 0
    let footerHeight = 0

    //重置窗口大小
    const resize = () => {
      //如果未设置高度，动态计算对话框高度el-scrollbar__view
      if (props.height) {
        dialogEl.style.height = props.height
      } else {
        let height = 0
        if (props.noScrollbar) {
          console.log(dialogEl.querySelector('.el-dialog__body'))
        } else {
          const viewHeight = dialogEl.querySelector('.el-scrollbar__view').offsetHeight
          height = viewHeight + headerHeight + footerHeight
        }

        //默认高度不能超出body
        if (height > document.body.clientHeight) {
          height = document.body.clientHeight - 100
          top_.value = '50px'
        }
        dialogEl.style.height = height + 'px'
      }
    }

    const handleOpen = () => {
      ctx.emit('open')
    }

    const handleOpened = () => {
      dialogEl = elDialogRef.value.dialogRef
      headerEl = dialogEl.querySelector('.el-dialog__header')
      footerEl = dialogEl.querySelector('.mu-dialog_footer')
      headerHeight = headerEl.offsetHeight
      footerHeight = footerEl.offsetHeight
      const { draggable, height } = props

      //开启拖拽功能，先计算初始坐标再计算大小
      if (draggable) {
        //拖拽模式对话框的定位会设置为fixed模式，所以需要重新计算对话框的left属性
        dialogEl.style.left = (document.body.offsetWidth - widthNumber.value) / 2 + 'px'
        dialogEl.style.top = props.top

        on(headerEl, 'mousedown', handleDragDown)
      }

      resize()

      //监听window窗口大小改变事件
      if (!height) {
        on(window, 'resize', resize)
      }
      ctx.emit('opened')
    }

    const handleClose = () => {
      ctx.emit('close')

      //关闭window窗口大小改变事件
      if (!props.height) off(window, 'resize', resize)
    }

    const handleClosed = () => {
      ctx.emit('closed')
    }

    const handleDragDown = e => {
      //开启拖拽并且不是全屏模式的情况才可以拖拽
      if (props.draggable && !isFullscreen.value) {
        dragDownState = e

        on(document, 'mousemove', handleDragMove)
        on(document, 'mouseup', handleDragUp)
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
      off(document, 'mousemove', handleDragMove)
      off(document, 'mouseup', handleDragUp)
    }

    return {
      size_,
      top_,
      class_,
      loadingOptions,
      visible,
      open,
      close,
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      elDialogRef,
      handleOpen,
      handleOpened,
      handleClose,
      handleClosed,
    }
  },
}
</script>
