<template>
  <div class="mu-doc-demo-block">
    <h1 class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </h1>
    <p class="desc">
      <slot name="desc">
        {{ desc }}
      </slot>
    </p>
    <div class="source">
      <slot />
    </div>
    <el-collapse-transition>
      <div v-show="showMeta" class="meta">
        <mu-doc-highlightjs :code="meta"></mu-doc-highlightjs>
      </div>
    </el-collapse-transition>
    <div v-show="meta" class="control" @click="handleShowMeta">
      <mu-button type="text" icon="code" :text="showMeta ? '隐藏代码' : '显示代码'" />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: '',
    },
    meta: {
      type: String,
      default: '',
    },
  },
  setup() {
    const codeRef = ref()
    const showMeta = ref(false)

    const handleShowMeta = () => {
      showMeta.value = !showMeta.value
    }

    return {
      codeRef,
      showMeta,
      handleShowMeta,
    }
  },
}
</script>
<style lang="scss">
.mu-doc-demo-block {
  padding: 15px;

  .title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 25px;
    color: #1f2f3d;
  }
  .desc {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;

    code {
      padding: 4px;
      margin: 0 4px;
      border: 1px solid #eaeefb;
      border-radius: 4px;
      background-color: #e4e7ed;
      color: #409eff;
    }

    .el-link {
      margin: 0 5px;
    }
  }
  .source {
    margin-bottom: 15px;
    background: #fff;

    .el-link {
      margin: 0 5px;
    }
  }

  .meta {
    margin-bottom: 15px;
  }

  .control {
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    background-color: #f9fafc;

    .el-button--text {
      color: #409eff;
    }

    &:hover {
      background-color: #66b1ff;
      .el-button--text {
        color: #fff;
      }
    }
  }
}
</style>
