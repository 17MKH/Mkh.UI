<template>
  <m-button type="success" @click="handleClick">显示抽屉</m-button>
  <m-drawer v-model="visible" title="短歌行·曹操 〔两汉〕" icon="list">
    <p>对酒当歌，人生几何！</p>
    <p>譬如朝露，去日苦多。</p>
    <p>慨当以慷，忧思难忘。</p>
    <p>何以解忧？唯有杜康。</p>
    <p>青青子衿，悠悠我心。</p>
    <p>但为君故，沉吟至今。</p>
    <p>呦呦鹿鸣，食野之苹。</p>
    <p>我有嘉宾，鼓瑟吹笙。</p>
    <p>明明如月，何时可掇？</p>
    <p>忧从中来，不可断绝。</p>
    <p>越陌度阡，枉用相存。</p>
    <p>契阔谈讌，心念旧恩。</p>
    <p>月明星稀，乌鹊南飞。</p>
    <p>绕树三匝，何枝可依？</p>
    <p>山不厌高，海不厌深。</p>
    <p>周公吐哺，天下归心。</p>
    <template #footer>
      <m-button type="success" size="small">确定</m-button>
      <m-button type="info" size="small" @click="visible = false">关闭</m-button>
    </template>
  </m-drawer>
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
