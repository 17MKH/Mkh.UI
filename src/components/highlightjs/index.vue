<template>
  <div class="mu-highlightjs">
    <pre><code ref="codeRef" class="html hljs xml" v-text="code"></code></pre>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup() {
    const codeRef = ref()

    onMounted(() => {
      hljs.highlightElement(codeRef.value)
    })

    return {
      codeRef,
    }
  },
}
</script>
<style lang="scss">
.mu-highlightjs {
  pre {
    margin: 0;
  }
  .hljs,
  .hljs-subst {
    padding: 18px 24px;
    font-size: 14px;
    background-color: #fafafa;
  }
}
</style>
