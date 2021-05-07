<template>
  <el-row class="mu-box-row" :gutter="20" style="height: 600px">
    <el-col :span="16">
      <mu-box header title="每日BUG数" icon="chart-pie-fill">
        <v-chart :option="option" />
      </mu-box>
    </el-col>
    <el-col :span="8">
      <mu-box title="堆叠区域图" icon="chart-line-fill-3">
        <v-chart :option="option1" />
      </mu-box>
    </el-col>
  </el-row>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
export default {
  setup() {
    const { $echarts } = getCurrentInstance().proxy
    const option = ref({
      backgroundColor: '#080b30',
      title: {
        text: '每日BUG数',
        textStyle: {
          align: 'center',
          color: '#fff',
          fontSize: 20,
        },
        top: '5%',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 255, 233,0)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(255, 255, 255,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 255, 233,0)',
                },
              ],
              global: false,
            },
          },
        },
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '15%',
        // containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: true,
          },
          splitArea: {
            // show: true,
            color: '#f00',
            lineStyle: {
              color: '#f00',
            },
          },
          axisLabel: {
            color: '#fff',
          },
          splitLine: {
            show: false,
          },
          boundaryGap: false,
          data: ['A', 'B', 'C', 'D', 'E', 'F'],
        },
      ],

      yAxis: [
        {
          type: 'value',
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            margin: 20,
            textStyle: {
              color: '#d1e6eb',
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '注册总量',
          type: 'line',
          // smooth: true, //是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: 'circle',
          symbolSize: 25,
          lineStyle: {
            normal: {
              color: '#6c50f3',
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
            },
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#6c50f3',
            },
          },
          itemStyle: {
            color: '#6c50f3',
            borderColor: '#fff',
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          tooltip: {
            show: false,
          },
          areaStyle: {
            normal: {
              color: new $echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(108,80,243,0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(108,80,243,0)',
                  },
                ],
                false
              ),
              shadowColor: 'rgba(108,80,243, 0.9)',
              shadowBlur: 20,
            },
          },
          data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
        },
        {
          name: '注册总量',
          type: 'line',
          // smooth: true, //是否平滑
          showAllSymbol: true,
          // symbol: 'image://./static/images/guang-circle.png',
          symbol: 'circle',
          symbolSize: 25,
          lineStyle: {
            normal: {
              color: '#00ca95',
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
            },
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#00ca95',
            },
          },

          itemStyle: {
            color: '#00ca95',
            borderColor: '#fff',
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          tooltip: {
            show: false,
          },
          areaStyle: {
            normal: {
              color: new $echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(0,202,149,0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,202,149,0)',
                  },
                ],
                false
              ),
              shadowColor: 'rgba(0,202,149, 0.9)',
              shadowBlur: 20,
            },
          },
          data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
        },
      ],
    })

    const option1 = ref({
      title: {
        text: '堆叠区域图',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            show: true,
            position: 'top',
          },
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    })
    return { option, option1 }
  },
}
</script>
