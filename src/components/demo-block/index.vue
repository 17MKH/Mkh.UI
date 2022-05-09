<template>
  <div class="m-doc-demo-block">
    <h3 class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </h3>
    <p class="desc">
      <slot name="desc">
        {{ desc }}
      </slot>
    </p>
    <div class="main">
      <div class="source">
        <slot />
      </div>
      <el-collapse-transition>
        <div v-show="showMeta" class="meta">
          <m-doc-highlightjs :code="meta"></m-doc-highlightjs>
        </div>
      </el-collapse-transition>
      <div v-show="meta" class="control" @click="handleShowMeta">
        <m-button icon="code">{{ showMeta ? '隐藏代码' : '显示代码' }}</m-button>
        <m-button icon="copy" @click.stop="handleCopy">复制代码</m-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import copy from 'clipboard-copy'
import useMessage from '../../../package/composables/message'

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
  setup(props) {
    const message = useMessage()

    const codeRef = ref()
    const showMeta = ref(false)

    const handleShowMeta = () => {
      showMeta.value = !showMeta.value
    }

    const handleCopy = () => {
      copy(props.meta)
      message.success('代码已复制到粘贴板')
    }

    return {
      codeRef,
      showMeta,
      handleShowMeta,
      handleCopy,
    }
  },
}
</script>
<style lang="scss">
.m-doc-demo-block {
  padding: 15px;

  .desc {
    margin: 10px 0;
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;

    > p {
      margin-bottom: 10px;
    }

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

  .main {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    overflow: hidden;

    &:hover {
      box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%), 0 2px 4px 0 rgb(232 237 250 / 50%);
    }
  }

  .source {
    padding: 20px;
    background: #fff;

    .el-link {
      margin: 0 5px;
    }
  }

  .meta {
    border-top: 1px solid #ebebeb;
  }
  .control {
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    background-color: #f9fafc;
    border-top: 1px solid #ebebeb;

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
