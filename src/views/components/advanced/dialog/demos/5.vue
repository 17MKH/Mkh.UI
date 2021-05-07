<template>
  <mu-button type="success" text="显示对话框" @click="handleClick" />
  <mu-dialog v-model="visible" title="蜀道难·李白 〔唐代〕" icon="list">
    <template #toolbar>
      <mu-button icon="plus" @click="handlePlus" />
      <mu-button icon="refresh" @click="handleRefrech" />
    </template>
    <p>
      噫吁嚱，危乎高哉！<br />蜀道之难，难于上青天！<br />蚕丛及鱼凫，开国何茫然！<br />尔来四万八千岁，不与秦塞通人烟。<br />西当太白有鸟道，可以横绝峨眉巅。<br />地崩山摧壮士死，然后天梯石栈相钩连。<br />上有六龙回日之高标，下有冲波逆折之回川。<br />黄鹤之飞尚不得过，猿猱欲度愁攀援。<br />青泥何盘盘，百步九折萦岩峦。<br />扪参历井仰胁息，以手抚膺坐长叹。
    </p>
    <p>
      问君西游何时还？畏途巉岩不可攀。<br />但见悲鸟号古木，雄飞雌从绕林间。<br />又闻子规啼夜月，愁空山。<br />蜀道之难，难于上青天，使人听此凋朱颜！<br />连峰去天不盈尺，枯松倒挂倚绝壁。<br />飞湍瀑流争喧豗，砯崖转石万壑雷。<br />其险也如此，嗟尔远道之人胡为乎来哉！
    </p>
    <p>剑阁峥嵘而崔嵬，一夫当关，万夫莫开。<br />所守或匪亲，化为狼与豺。<br />朝避猛虎，夕避长蛇，磨牙吮血，杀人如麻。<br />锦城虽云乐，不如早还家。<br />蜀道之难，难于上青天，侧身西望长咨嗟！</p>
  </mu-dialog>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { useLoading } from '@/package/composables'
export default {
  setup() {
    const cti = getCurrentInstance().proxy
    const visible = ref(false)
    const loading = useLoading(cti)

    const handleClick = () => {
      visible.value = true
    }

    const handleRefrech = () => {
      loading.open()

      setTimeout(() => {
        loading.close()
      }, 1500)
    }

    const handlePlus = () => {
      cti.$message.success({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
      })
    }

    return {
      visible,
      handleClick,
      handleRefrech,
      handlePlus,
    }
  },
}
</script>
