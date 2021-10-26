<template>
  <el-row :gutter="15">
    <el-col :span="6">
      <m-box-small value="350" label="新订单" unit="笔" color="#17A2B8" icon="app" more @more="handleMore"> </m-box-small>
    </el-col>
    <el-col :span="6">
      <m-box-small value="53000" label="销售额" unit="万元" color="#28A745" icon="money"> </m-box-small>
    </el-col>
    <el-col :span="6">
      <m-box-small value="60" label="环比" unit="%" color="#FFC107" icon="rocket"> </m-box-small>
    </el-col>
    <el-col :span="6">
      <m-box-small value="3021" label="退款额" unit="万元" color="#DC3545" icon="form"> </m-box-small>
    </el-col>
  </el-row>
</template>
<script>
import useMessage from '../../../../../../package/composables/message'
export default {
  setup() {
    const message = useMessage()
    const handleMore = () => {
      message.success('点击了更多')
    }
    return {
      handleMore,
    }
  },
}
</script>
