<template>
  <m-container scrollbar>
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
    <el-row style="height: 400px" :gutter="15">
      <el-col :span="12">
        <chart-1 />
      </el-col>
      <el-col :span="12">
        <chart-2 />
      </el-col>
    </el-row>
    <list-demo class="m-margin-t-20" />
  </m-container>
</template>
<script>
import { useMessage } from '../../../../package/composables'
import Chart1 from './components/chart-1.vue'
import Chart2 from './components/chart-2.vue'
import ListDemo from '../advanced/list/demos/3.vue'
export default {
  components: { Chart1, Chart2, ListDemo },
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
