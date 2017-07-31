<template>
	<div class="wrap">
		<div class="banner-img">
			
		</div>
		<div class="brandWarp">
			<div class="sale-tab">
				<el-date-picker
		      v-model="sale_date"
		      type="date"
		      placeholder="选择日期">
		    </el-date-picker>
		    <el-button type="primary" class="tab-btn01" v-show="!btn_show" @click="tabChartHandler">切换至图表模式</el-button>
		    <el-button type="primary" class="tab-btn01" v-show="btn_show" @click="tabTableHandler">切换至表格模式</el-button>
			</div>
			<h1 class="title">2017年7月销售排行榜</h1>
			<div class="title_info">
				共5000名销售员，您当前排名：第<span class="color-red">2</span>名，比上月提升<span class="color-red">5</span>个名次。其中客户数为<span class="color-red">101</span>，订单数为<span class="color-red">48</span>，销售额为<span class="color-red">490,000</span>元。
			</div>
			<el-table :data="tableData" style="width: 100%" v-show="!btn_show">
				<el-table-column type="index" label="排名" align="center" width="180">
	      </el-table-column>
	      <el-table-column prop="salePhone" label="销售员" align="center" width="180">
	      </el-table-column>
	      <el-table-column prop="custNo" label="客户数" align="center" width="180">
	      </el-table-column>
	      <el-table-column prop="orderNo" label="订单数" align="center">
	      </el-table-column>
	      <el-table-column prop="saleMoney" label="销售额（元）" align="center">
	      </el-table-column>
	      <el-table-column prop="ranking" label="排名变化" align="center">
	      </el-table-column>
	    </el-table>
	    <el-col :span="24" class="warp-breadcrum">
	      <div id="saleChart" :style="{width: '1200px', height: '600px', margin: 'auto' }"></div>
	    </el-col>
		</div>
		
	</div>
</template>	

<script>
  let echarts = require('../../../../node_modules/echarts/lib/echarts')
  // 引入柱状图组件
	require('echarts/lib/chart/bar');
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	export default {
		data(){
			return {
				sale_date: '',
				btn_show: false,
				tableData: [{
          salePhone: 18652599279,
          custNo: 100,
          orderNo: 100,
          saleMoney: 100.00,
          ranking: 'up'
        },{
          salePhone: 18652599279,
          custNo: 100,
          orderNo: 100,
          saleMoney: 100.00,
          ranking: 'up'
        },{
          salePhone: 18652599279,
          custNo: 100,
          orderNo: 100,
          saleMoney: 100.00,
          ranking: 'up'
        },{
          salePhone: 18652599279,
          custNo: 100,
          orderNo: 100,
          saleMoney: 100.00,
          ranking: 'up'
        },{
          salePhone: 18652599279,
          custNo: 100,
          orderNo: 100,
          saleMoney: 100.00,
          ranking: 'up'
        }]
			}
		},
		created(){
			this.drawBar()
		},
		methods: {
			drawBar(){
	      var that = this;
	      // 基于准备好的dom，初始化echarts实例
	      var myChart = echarts.getInstanceByDom(document.getElementById('saleChart'));
	      if (myChart === undefined) {  
	        myChart = echarts.init(document.getElementById('saleChart'));
	      }
	      myChart.clear();
	      myChart.setOption({
	      	title: {
			        text: '世界人口总量'
			    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    legend: {
			        data: ['2011年']
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: {
			        type: 'value',
			        boundaryGap: [0, 0.01]
			    },
			    yAxis: {
			        type: 'category',
			        data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
			    },
			    series: [
			        {
			            name: '2011年',
			            type: 'bar',
			            data: [18203, 23489, 29034, 104970, 131744, 630230]
			        }
			    ]
	      });
	    },
      
			tabChartHandler(){

			},
			tabTableHandler(){

			}
		}
	}
</script>

<style scoped>
  .el-button--primary {
    color: #fff;
    background-color: #5db7e8!important;
    border-color: #5db7e8!important;
  }
  .el-button--primary:hover {
    color: #fff;
    background-color: #57a5cf!important;
    border-color: #57a5cf!important;
  }
	.banner-img{
		width: 100%;
		height: 630px;
		background: #ccc;
	}
	.brandWarp{
		width: 1200px;
		margin: 20px auto;
	}
	.warp-breadcrum{
    margin-top: 36px;
  }
	.tab-btn01{
		margin-left: 20px;
	}
	.title{
		font-size: 24px;
		text-align: center;
		margin: 20px;
	}
	.title_info{
		margin-bottom: 10px;
	}
	.color-red{
		color: #ff0000;
		font-weight: bold;
	}
</style>