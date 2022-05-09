<template>
  <m-button type="success" @click="handleClick">显示对话框</m-button>
  <m-dialog v-model="visible" title="关雎·佚名 〔先秦〕" icon="list" width="500px" no-scrollbar>
    <div class="m-text-center">
      <p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。</p>
      <p>参差荇菜，左右流之。窈窕淑女，寤寐求之。</p>
      <p>求之不得，寤寐思服。悠哉悠哉，辗转反侧。</p>
      <p>参差荇菜，左右采之。窈窕淑女，琴瑟友之。</p>
      <p>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。</p>
    </div>
  </m-dialog>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const visible = ref(false)

    const handleClick = () => {
      visible.value = true
    }

    return {
      visible,
      handleClick,
    }
  },
}
</script>
