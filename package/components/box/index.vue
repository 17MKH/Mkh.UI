<template>
  <section
    v-loading="loading"
    :class="class_"
    :style="{ height }"
    :element-loading-text="loadingText || $t('mkh.loading_text')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <!--头部-->
    <m-head v-if="header" class="m-box_header" :icon="icon" :icon-color="iconColor" :size="size_">
      <slot name="title">{{ title }}</slot>
      <template #toolbar>
        <!--工具栏插槽-->
        <slot name="toolbar" />
        <!--折叠按钮，页模式下折叠功能无效-->
        <m-button v-if="showCollapse" :icon="isCollapse ? 'chevron-down' : 'chevron-up'" @click="toggleCollapse" />
        <!--全屏按钮-->
        <m-button v-if="showFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
      </template>
    </m-head>
    <el-collapse-transition>
      <section v-show="!isCollapse" class="m-box_dialog">
        <section class="m-box_content">
          <m-scrollbar v-if="showScrollbar" ref="scrollbarRef" :horizontal="horizontalScrollbar">
            <slot />
          </m-scrollbar>
          <section v-else class="m-box_body">
            <slot />
          </section>
        </section>
        <footer v-if="$slots.footer" class="m-box_footer">
          <slot name="footer"></slot>
        </footer>
      </section>
    </el-collapse-transition>
  </section>
</template>
<script>
import { computed, ref } from 'vue'
import { useCollapse, useFullscreen, useSize } from '../../composables'
import props from './props'
export default {
  props,
  emits: ['fullscreen-change', 'collapse-change'],
  setup(props, { emit }) {
    const { store } = mkh
    const scrollbarRef = ref()
    const loadingOptions = store.state.app.config.component.loading
    const { size: size_ } = useSize(props)

    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(emit)

    //判断是否显示滚动条
    const showScrollbar = computed(() => !props.noScrollbar && (props.height || props.page))

    const class_ = computed(() => {
      return [
        'm-box',
        size_,
        isFullscreen.value ? 'is-fullscreen' : '',
        props.height ? 'has-height' : '',
        props.page ? 'page' : '',
        props.noPadding ? 'no-padding' : '',
        showScrollbar.value ? '' : 'no-scrollbar',
      ]
    })

    //重置滚动条
    const resizeScrollbar = () => {
      if (showScrollbar.value) {
        scrollbarRef.value.update()
      }
    }

    return {
      ...useCollapse(emit),
      size_,
      class_,
      scrollbarRef,
      loadingOptions,
      showScrollbar,
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      resizeScrollbar,
    }
  },
}
</script>
