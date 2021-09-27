<template>
  <m-container>
    <m-doc-component-doc title="图标组件(m-box)" :props="props">
      <m-doc-demo-block title="简单用法">
        <template #desc>
          <p>图标组件是基于阿里矢量图表库<el-link type="primary" href="https://www.iconfont.cn/">https://www.iconfont.cn/</el-link>封装的</p>
          <p>用户也可以通过导入自己从阿里图表库下载的<code>iconfont.js</code>文件的方式来添加自己的图标</p>
        </template>
      </m-doc-demo-block>

      <m-doc-demo-block title="图标选择器" :meta="code">
        <template #desc>
          <p>以下显示了所有图标，点击图标即可快速复制代码</p>
          <demo />
        </template>
      </m-doc-demo-block>

      <m-doc-demo-block title="图标预览">
        <template #desc>
          <p>以下显示了所有图标，点击图标即可快速复制代码</p>
          <ul class="icon-panel">
            <li v-for="item in list" :key="item" @click="handleCopy(item)">
              <m-icon :name="item"></m-icon>
              <span>{{ item }}</span>
            </li>
          </ul>
        </template>
      </m-doc-demo-block>
    </m-doc-component-doc>
  </m-container>
</template>
<script>
import { ref } from 'vue'
import { useMessage } from '../../../../../package/composables'
import props from './apis/_props'
import copy from 'clipboard-copy'
import demo from './demos/1.vue'
import code from './demos/1.vue?raw'
export default {
  components: { demo },
  setup() {
    const message = useMessage()
    const list = ref([])
    var symbols = document.querySelectorAll('body>svg>symbol')
    symbols.forEach(m => {
      list.value.push(m.id.replace('m-', ''))
    })

    const handleCopy = code => {
      const html = `<m-icon name="${code}"></m-icon>`

      copy(html)

      message.success(`代码已复制到粘贴板：${html}`)
    }

    return {
      props,
      list,
      code,
      handleCopy,
    }
  },
}
</script>
<style lang="scss" scoped>
.icon-panel {
  li {
    position: relative;
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    cursor: pointer;

    .m-icon {
      font-size: 32px;
      margin-bottom: 15px;
      transition: color 0.15s linear;
    }

    span {
      position: absolute;
      left: 50%;
      bottom: -40px;
      transform: translateX(-50%);
      font-size: 14px;
    }

    &:hover {
      color: #5cb6ff;
    }
  }
}
</style>
