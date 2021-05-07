<template>
  <section
    v-loading="loading"
    :class="class_"
    :style="{ height }"
    :element-loading-text="loadingText || $t('mkh.dialog.loadingText')"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <!--头部-->
    <mu-head v-if="header" class="mu-box_header" :icon="icon" :icon-color="iconColor" :size="size_">
      <slot name="title">{{ title }}</slot>
      <template #toolbar>
        <!--工具栏插槽-->
        <slot name="toolbar" />
        <!--折叠按钮，页模式下折叠功能无效-->
        <mu-button v-if="showCollapse" :icon="isCollapse ? 'chevron-down' : 'chevron-up'" @click="toggleCollapse" />
        <!--全屏按钮-->
        <mu-button v-if="showFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
      </template>
    </mu-head>
    <el-collapse-transition>
      <section v-show="!isCollapse" class="mu-box_dialog">
        <section class="mu-box_content">
          <mu-scrollbar v-if="showScrollbar" ref="scrollbarRef" :horizontal="horizontalScrollbar">
            <slot />
          </mu-scrollbar>
          <slot v-else />
        </section>
        <footer v-if="$slots.footer" class="mu-box_footer">
          <slot name="footer"></slot>
        </footer>
      </section>
    </el-collapse-transition>
  </section>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useCollapse, useFullscreen } from '../../composables'
import props from './props'
export default {
  name: 'Box',
  props,
  emits: ['fullscreen-change', 'collapse-change'],
  setup(props, ctx) {
    const store = useStore()
    const scrollbarRef = ref()
    const loadingOptions = MkhUI.config.component.loading
    const size_ = computed(() => props.size || store.state.app.account.skin.size)

    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(ctx.emit)

    //判断是否显示滚动条
    const showScrollbar = computed(() => !props.noScrollbar.value && (props.height || props.page))

    const class_ = computed(() => {
      return [
        'mu-box',
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
      ...useCollapse(ctx.emit),
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
