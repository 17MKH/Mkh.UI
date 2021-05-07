<template>
  <div :class="['mu-doc-component', isFullscreen ? 'is-fullscreen' : '']">
    <h1 class="mu-doc-component_title">{{ title }}</h1>
    <mu-button class="mu-doc-component_fullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
    <el-tabs class="mu-doc-component_tabs" type="border-card">
      <el-tab-pane label="组件示例(Demo)">
        <mu-scrollbar>
          <slot></slot>
        </mu-scrollbar>
      </el-tab-pane>
      <el-tab-pane v-if="props" label="属性(Attributes)">
        <el-table class="mu-doc-component_table" height="100%" :data="props" border>
          <el-table-column prop="name" label="参数"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="values" label="可选值"></el-table-column>
          <el-table-column prop="default" label="默认值"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-if="events" label="事件(Events)">
        <el-table class="mu-doc-component_table" height="100%" :data="events" border>
          <el-table-column prop="name" label="事件"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="params" label="参数"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-if="methods" label="方法(Methods)">
        <el-table class="mu-doc-component_table" height="100%" :data="methods" border>
          <el-table-column prop="name" label="方法"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="params" label="参数"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-if="slots" label="插槽(Slots)">
        <el-table class="mu-doc-component_table" height="100%" :data="slots" border>
          <el-table-column prop="name" label="插槽"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
          <el-table-column prop="params" label="参数"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { useFullscreen } from '../../../package/composables'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    props: {
      type: Array,
      default: null,
    },
    events: {
      type: Array,
      default: null,
    },
    methods: {
      type: Array,
      default: null,
    },
    slots: {
      type: Array,
      default: null,
    },
  },
  setup(props, ctx) {
    const { isFullscreen, toggleFullscreen } = useFullscreen(ctx.emit)
    return {
      isFullscreen,
      toggleFullscreen,
    }
  },
}
</script>
<style lang="scss">
.mu-doc-component {
  position: relative;
  padding-top: 60px;
  height: 100%;

  &_title {
    position: absolute;
    top: 0;
    font-size: 28px;
    font-weight: 400;
    color: #1f2f3d;
  }
  &_tabs {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;

    > .el-tabs__header {
      flex-shrink: 0;
      height: 39px;
    }

    > .el-tabs__content {
      flex-grow: 1;
      padding: 0;

      > .el-tab-pane {
        height: 100%;
      }
    }
  }

  &_table {
    height: 100%;
    width: 100%;
    border: none;
  }

  &_fullscreen {
    position: absolute;
    right: 0;
    top: 65px;
    padding: 0;
    margin: 0 10px 0 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
    color: #606266;
    z-index: 1001;

    &:focus {
      color: #606266;
    }

    &:hover {
      transform: scale(1.2);
    }

    .mu-icon {
      transform: scale(1) !important;
    }
  }

  &.is-fullscreen {
    .mu-doc-component_fullscreen {
      position: fixed;
      right: 5px;
      top: 5px;
    }

    .el-tabs {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 1000;
    }
  }
}
</style>
