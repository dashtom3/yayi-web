<template>
	<div class="wrap">
		<div class="banner-img">
			<img :src="ranking_img" alt="排行榜">
		</div>
		<div class="brandWarp">
			<div class="sale-tab">
				<el-date-picker
		      v-model="sale_date"
		      type="month"
		      placeholder="选择日期"
		      :clearable="false"
		      @change="selHandler">
		    </el-date-picker>
		    <el-button type="primary" class="tab-btn01" v-show="!btn_show" @click="tabChartHandler">切换至图表模式</el-button>
		    <el-button type="primary" class="tab-btn01" v-show="btn_show" @click="tabTableHandler">切换至表格模式</el-button>
			</div>
			<h1 class="title">{{year}}年{{month}}月销售排行榜</h1>
			<div class="title_info" v-show="!isRanking">
				共{{sale_total_num}}名销售员，您当前排名：第<span class="color-red">{{ranking_info.rowNum}}</span>名<!-- ，比上月提升<span class="color-red">5</span>个名次 -->。其中客户数为<span class="color-red">{{ranking_info.bindUserNum}}</span>，订单数为<span class="color-red">{{ranking_info.orderCount}}</span>，实际销售额为<span class="color-red">{{ranking_info.saleMoney}}</span>元。
			</div>
			<div class="title_info" v-show="isRanking">
				共{{sale_total_num}}名销售员，非常抱歉，您当前未上榜。
			</div>
			<el-table :data="tableData" style="width: 100%" v-show="!btn_show">
				<el-table-column type="index" label="排名" align="center" width="180">
	      </el-table-column>
	      <el-table-column prop="phone" label="销售员" align="center" width="180">
	      </el-table-column>
	      <el-table-column prop="bindUserNum" label="客户数" align="center" width="180">
	      </el-table-column>
	      <el-table-column prop="orderCount" label="订单数" align="center">
	      </el-table-column>
	      <el-table-column prop="saleMoney" label="实际销售额（元）" align="center">
	      </el-table-column>
	      <!-- <el-table-column prop="rowNum" label="排名变化" align="center">
	      </el-table-column> -->
	    </el-table>
	    <el-col :span="24" class="warp-breadcrum" v-show="btn_show">
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
				tableData: [],
				sale_total_num: 0,
				isRanking: false,
				ranking_info: {
					rowNum: 1,
					orderCount: 0,
					bindUserNum: 0,
					saleMoney: 0
				},
				ranking_img: '',
				year: '',
				month: '',
				ranking_arr: [],
				data_arr: [],
				color_arr: []
			}
		},
		created(){
			var that = this
			this.sale_date = new Date().getFullYear() + '-' + this.fillZero(new Date().getMonth() + 1)
			this.year = this.sale_date.split('-')[0]
	    this.month = this.sale_date.split('-')[1]
	    this.init()
			this.queryBanner()
		},
		watch: {
			tableData: function(){
				this.drawBar()
			}
		},
		methods: {
			//查询banner
			queryBanner(){
        var that = this;
        that.global.axiosGetReq('/adv/showAdv',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.ranking_img = res.data.data && res.data.data[res.data.data.length-1].advUrl
          }
        })
      },
			//查询排行榜文字数据
			init(){
				var that = this
				var params = {
					beYearMonth: this.sale_date,
					saleToken: that.global.getSalesToken()
				}
				that.global.axiosGetReq('/rankingList/compareData',params).then((res) => {
	        if (res.data.callStatus === 'SUCCEED') { 
	          this.sale_total_num = res.data.num
	          this.ranking_info = res.data.data || {}
	          if(res.data.msg && res.data.msg.indexOf("未上榜") !== -1){
	          	this.ranking_info.rowNum = 0
	        		this.isRanking = true
	        	}else if(res.data.msg && res.data.msg === "无该月排行榜数据"){
	        		this.sale_total_num = 0
		        	this.ranking_info = {
								rowNum: 0,
								orderCount: 0,
								bindUserNum: 0,
								saleMoney: 0
							}
	        	}
	        }
	        this.queryHandler()
      	})
			},
			//查询排行榜table数据
			queryHandler(){
				var that = this
				var params = {
					beYearMonth: this.sale_date
				}
				this.ranking_arr = []
	      this.data_arr = []
	      this.color_arr = []
				that.global.axiosGetReq('/rankingList/list',params).then((res) => {
	        if (res.data.callStatus === 'SUCCEED') { 
	          this.tableData = res.data.data
	          
	          //当前销售员的排行颜色为红色
	          if(res.data.data !== null){
	          	for(var i=0;i<res.data.data.length;i++){
		          	this.ranking_arr.push(res.data.data[i].rowNum)
		          	this.data_arr.push(res.data.data[i].saleMoney)
		          	this.color_arr.push('#5db7e8')
		          }
		          //存在排名的情况下
		          if(this.ranking_info.rowNum){
		          	this.color_arr.splice(this.ranking_info.rowNum-1, 1, '#ff0000')
		            this.color_arr = this.color_arr.reverse()
		          }
		          
		          this.ranking_arr = this.ranking_arr.reverse()
		          this.data_arr = this.data_arr.reverse()
	          }else{
	          	if(res.data.msg && res.data.msg.indexOf("未上榜") !== -1){
		        		this.isRanking = true
			        	this.ranking_info.rowNum = 0
		        	}else if(res.data.msg && res.data.msg === "无该月排行榜数据"){
		        		this.tableData = []
		        	}
	          }  
	        }
      	})
			},
			selHandler(val){
				var that = this
	      this.sale_date = val
	      this.year = this.sale_date.split('-')[0]
	      this.month = this.sale_date.split('-')[1]
	      this.init()     
	    },
			//月份补0
	    fillZero(n){
	      return n<10 ? '0'+ n: n 
	    },
			drawBar(){
	      var that = this;
	      document.getElementById('saleChart').style.height = this.data_arr.length && this.data_arr.length * 100 + 'px' || '400px'
	      // 基于准备好的dom，初始化echarts实例
	      var myChart = echarts.getInstanceByDom(document.getElementById('saleChart'));
	      if (myChart === undefined) {  
	        myChart = echarts.init(document.getElementById('saleChart'));
	      }

	      myChart.clear();
	      myChart.setOption({
	      	title: {
			        text: '排名'
			    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    legend: {
			        data: [this.year+'年']
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
			        data: this.ranking_arr
			    },
			    series: [
			        {
			            name: this.year+'年',
			            type: 'bar',
			            itemStyle: {
                    normal: {
                      color(params) {
                        var colorList = that.color_arr;
                        return colorList[params.dataIndex]
                      },
                      label: {
                          show: true,
                          position: 'right',
                          formatter: '{c}',
                          textStyle: {
                          	color: '#000'
                          }
                      }
                    }
                  },
			            barWidth: 30,
			            barGap: '1%',
			            data: this.data_arr
			        }
			    ]
	      });
	    },
      
			tabChartHandler(){
				this.btn_show = true
				this.init()
			},
			tabTableHandler(){
				this.btn_show = false
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
	}
	.banner-img img{
		width: 100%;
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