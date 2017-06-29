<template>
	<el-row class="brandWarp">
		<el-col :span="24" class="warp-breadcrum">
      <div id="myChart" :style="{width: '1300px', height: '600px', margin: 'auto' }"></div>
    </el-col>
	</el-row>
</template>

<script>
let echarts = require('../../../../node_modules/echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line');
// // 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
	name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine();
  },
	methods: {
		drawLine(){
			// 基于准备好的dom，初始化echarts实例
      let myChart=document.getElementById('myChart')

      let mainChart = echarts.init(myChart)// 基于准备好的dom，初始化echarts实例
      // 绘制图表
      mainChart.setOption({
          title: {
              text: '收入（元）'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['邮件营销']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['0','5','10','15','20','25','30']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  name:'总收入',
                  type:'line',
                  stack: '总收入',
                  data:[0, 500, 700, 2200, 1600, 3000, 3500]
              }
          ]
      });

		}
	}
}
</script>

<style>
	
</style>