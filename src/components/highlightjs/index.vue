<template>
  <div class="m-highlightjs">
    <pre><code ref="codeRef" class="html hljs xml" v-text="code"></code></pre>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/color-brewer.css'

  const props = defineProps({
    code: {
      type: String,
      required: true,
    },
  })

  const codeRef = ref()

  onMounted(() => {
    hljs.highlightElement(codeRef.value)
  })
</script>
<style lang="scss">
  .m-highlightjs {
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
