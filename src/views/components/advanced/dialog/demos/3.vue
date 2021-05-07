<template>
  <mu-button type="success" text="显示对话框" @click="handleClick" />
  <mu-dialog v-model="visible" title="春江花月夜·张若虚 〔唐代〕" icon="list">
    <div class="mu-font-size-30 mu-text-center">
      <p>春江潮水连海平，海上明月共潮生。</p>
      <p>滟滟随波千万里，何处春江无月明！</p>
      <p>江流宛转绕芳甸，月照花林皆似霰。</p>
      <p>空里流霜不觉飞，汀上白沙看不见。</p>
      <p>江天一色无纤尘，皎皎空中孤月轮。</p>
      <p>江畔何人初见月？江月何年初照人？</p>
      <p>人生代代无穷已，江月年年望相似。</p>
      <p>不知江月待何人，但见长江送流水。</p>
      <p>白云一片去悠悠，青枫浦上不胜愁。</p>
      <p>谁家今夜扁舟子？何处相思明月楼？</p>
      <p>可怜楼上月徘徊，应照离人妆镜台。</p>
      <p>玉户帘中卷不去，捣衣砧上拂还来。</p>
      <p>此时相望不相闻，愿逐月华流照君。</p>
      <p>鸿雁长飞光不度，鱼龙潜跃水成文。</p>
      <p>昨夜闲潭梦落花，可怜春半不还家。</p>
      <p>江水流春去欲尽，江潭落月复西斜。</p>
      <p>斜月沉沉藏海雾，碣石潇湘无限路。</p>
      <p>不知乘月几人归，落月摇情满江树。</p>
    </div>
  </mu-dialog>
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
