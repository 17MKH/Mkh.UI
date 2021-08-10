<template>
  <div class="m-tabnav">
    <m-flex-row>
      <m-flex-fixed>
        <slot name="before" />
      </m-flex-fixed>
      <m-flex-auto>
        <el-tabs :model-value="current.fullPath" type="card" :closable="true" @tab-click="handleTabClick" @tab-remove="handleTabRemove" @contextmenu.prevent="showContextmenu">
          <el-tab-pane :name="$mkh.config.site.home">
            <template #label>
              <span index="-1"> <m-icon v-if="showIcon" name="home" /> 首页</span>
            </template>
          </el-tab-pane>
          <el-tab-pane v-for="(item, i) in opened" :key="item.fullPath" :name="item.fullPath">
            <template #label>
              <span :index="i"> <m-icon v-if="showIcon && item.icon" :name="item.icon" />{{ item.label }}</span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </m-flex-auto>
    </m-flex-row>
    <div v-show="contextmenu.show" ref="contextmenuRef" class="m-tabnav_contextmenu" :style="{ top: contextmenu.top, left: contextmenu.left }">
      <ul>
        <li @click.stop="handleRefresh"><m-icon name="refresh" />重新载入</li>
        <li v-if="contextmenu.showClose" @click.stop="handleClose"><m-icon name="close" />关闭</li>
        <li @click.stop="handleCloseLeft"><m-icon name="arrow-left" />关闭左侧</li>
        <li @click.stop="handleCloseRight"><m-icon name="arrow-right" />关闭右侧</li>
        <li @click.stop="handleCloseOther"><m-icon name="other" />关闭其它</li>
        <li @click.stop="handleCloseAll"><m-icon name="app" />关闭全部</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { computed, inject, reactive, ref, toRefs } from 'vue'
import { store } from '../../store'
import { router } from '../../router'
import dom from '../../utils/dom'
import { useRoute } from 'vue-router'
export default {
  name: 'Tabnav',
  setup() {
    //先从从本地存储中加载缓存的页面数据
    store.commit('app/page/init')

    const route = useRoute()
    const open = to => {
      store.dispatch('app/page/open', to, { root: true })
    }
    //注册一个路由钩子函数
    router.afterEach(open)

    //此处必须执行一次，因为上面的钩子函数注册后下次切换路由才会执行
    open(route)

    const reload = inject('reload')
    const { current, opened } = toRefs(store.state.app.page)
    const showIcon = computed(() => mkh.config.component.tabnav.showIcon)
    const contextmenu = reactive({ show: false, top: '', left: '', index: 0, page: null, showClose: true })
    const contextmenuRef = ref()

    const handleTabClick = tab => {
      //当前标签不能重复点击
      if (tab.paneName === current.value.fullPath) {
        return
      }
      router.push(tab.paneName)
    }

    const close = index => {
      store.dispatch('app/page/close', index)
    }

    const handleTabRemove = name => {
      close(opened.value.findIndex(m => m.fullPath === name))
    }

    const showContextmenu = event => {
      const { path } = event
      for (let i = 0; i < path.length; i++) {
        if (dom.hasClass(path[i], 'el-tabs__item')) {
          const index = parseInt(path[i].querySelector('span').getAttribute('index'))
          contextmenu.show = true
          contextmenu.showClose = index !== '-1'
          contextmenu.top = event.y + 'px'
          contextmenu.left = event.x + 'px'
          contextmenu.index = index
          contextmenu.page = opened.value[index]

          dom.on(document, 'mouseup', hideContextmenu)
          break
        }
      }
    }

    const hideContextmenu = () => {
      contextmenu.show = false
      dom.off(document, 'mouseup', hideContextmenu)
    }

    const handleRefresh = () => {
      if (reload) {
        reload(contextmenu.page)
      }
    }

    const handleClose = () => {
      close(contextmenu.index)
    }

    const handleCloseLeft = () => {
      store.dispatch('app/page/closeLeft', contextmenu.index)
    }

    const handleCloseRight = () => {
      store.dispatch('app/page/closeRight', contextmenu.index)
    }

    const handleCloseOther = () => {
      store.dispatch('app/page/closeOther', contextmenu.index)
    }

    const handleCloseAll = () => {
      store.dispatch('app/page/closeAll')
    }

    return {
      current,
      opened,
      showIcon,
      contextmenu,
      contextmenuRef,
      handleTabClick,
      handleTabRemove,
      showContextmenu,
      handleRefresh,
      handleClose,
      handleCloseLeft,
      handleCloseRight,
      handleCloseOther,
      handleCloseAll,
    }
  },
}
</script>
