<template>
  <el-drawer
    v-model="visible"
    :custom-class="class_"
    :size="direction === 'rtl' || direction === 'ltr' ? width : height"
    :direction="direction"
    :show-close="false"
    :modal="modal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
    :modal-class="modalClass"
    :z-index="zIndex"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <!--头部-->
    <template v-if="header" #header>
      <m-head class="m-drawer_header" :icon="icon" :icon-color="iconColor" :size="size_">
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

    <!--内容区域-->
    <div
      v-loading="loading"
      class="m-drawer_content"
      :element-loading-text="loadingText || $t('mkh.loading_text')"
      :element-loading-background="loadingBackground || loadingOptions.background"
      :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
    >
      <!--内容-->
      <section class="m-drawer_body">
        <div class="m-drawer_wrapper">
          <slot v-if="noScrollbar"></slot>
          <m-scrollbar v-else>
            <slot />
          </m-scrollbar>
        </div>
      </section>
      <!--尾部-->
      <footer v-if="$slots.footer" class="m-drawer_footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </el-drawer>
</template>
<script>
import { computed } from 'vue'
import { useVisible, useFullscreen } from '../../composables'
import props from './props'
export default {
  inheritAttrs: false,
  props,
  emits: ['update:modelValue', 'open', 'opened', 'close', 'closed'],
  setup(props, { emit }) {
    const { store } = mkh

    const size_ = computed(() => props.size || store.state.app.profile.skin.size)

    //加载动画配置
    const loadingOptions = store.state.app.config.component.loading

    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)

    //使用当前时间戳创建唯一ID
    const class_ = computed(() => {
      const { customClass, noPadding, noScrollbar } = props
      let classList = ['m-drawer', `m-drawer-${new Date().getTime()}`]
      if (size_.value) classList.push(size_.value)
      if (noPadding) classList.push('no-padding')
      if (noScrollbar) classList.push('no-scrollbar')
      if (isFullscreen.value) classList.push('is-fullscreen')
      if (customClass) classList.push(props.customClass)

      return classList.join(' ')
    })

    const handleOpen = () => {
      emit('open')
    }

    const handleOpened = () => {
      emit('opened')
    }

    const handleClose = () => {
      emit('close')
    }

    const handleClosed = () => {
      emit('closed')
    }

    return {
      ...useVisible(props, emit),
      size_,
      class_,
      loadingOptions,
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      handleOpen,
      handleOpened,
      handleClose,
      handleClosed,
    }
  },
}
</script>
