<template>
	<div>
		<el-col :span="24" class="warp-breadcrum">
      <div id="myChart" :style="{width: '1200px', height: '600px', margin: 'auto' }"></div>
    </el-col>
    <el-col :span="24" style="margin-bottom:10px;margin-top:40px;">
      <div class="grid-content bg-purple-dark fl">
        <span>销售总额：<i class="i_col_red">￥<span>{{tableData.allCommission}}</span></i></span>
        <span class="margin_l">耗材类销售总额：<i class="i_col_red">￥{{tableData.stayCommission}}</i></span>
        <span class="margin_l">工具设备类销售总额：<i class="i_col_red">￥{{tableData.hasCommission}}</i></span>
      </div>
      <div class="grid-content bg-purple-dark fr">
        <span class="margin_l">共：<i class="i_col_red">{{tableData.orderNum}}</i>单</span>
      </div>
    </el-col>
		<el-col :span="24" class="warp-main" style="margin: auto;margin-bottom:100px;">
      <el-table :data="tableData.myOrderVoList" align="center" border style="width: 100%">
        <el-table-column type="index" align="center" label="序号">
        </el-table-column>
        <el-table-column prop="orderCreated" align="center" label="下单时间">
        </el-table-column>
        <el-table-column prop="userName" align="center" label="客户姓名">
        </el-table-column>
        <el-table-column prop="userPhone" align="center" label="客户手机号">
        </el-table-column>
        <el-table-column prop="itemName" align="center" label="销售额（元）">
        </el-table-column>
        <el-table-column prop="totalFee"  align="center"label="耗材类（元）">
        </el-table-column>
        <el-table-column prop="refundMoney" align="center" label="工具设备类（元）">
        </el-table-column>
        <el-table-column prop="refundMoney" align="center" label="已退款金额（元）">
        </el-table-column>
        <el-table-column prop="refundMoney" align="center" label="实际销售额（元）">
        </el-table-column>
        <el-table-column prop="handler" align="center" label="操作">
          <template scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="queryDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>  
        </el-table-column>
      </el-table>
    </el-col>

    <!-- 详情 -->
    <el-dialog
      :visible.sync="detailVisible"
      size="small">
      <div class="detail_title">业绩详情</div>
      <div class="custInfo">客户信息</div>
      <div class="custContent"><b>客户姓名：</b><span>李志芳</span><b style="margin-left:80px;">客户手机号：</b><span>13861637946</span></div>
      <div class="custInfo">订单信息</div>
      <table class="datail_tb">
        <tr><td colspan="7"><span class="pad_l_30">下单时间：2017-06-08</span><span class="pad_l_30">订单状态：卖家已发货</span></td></tr>
        <tr class="trs tr_title">
          <td>商品名称+属性</td>
          <td>价格（元）</td>
          <td>数量</td>
          <td>小计</td>
        </tr>
        <tr class="trs" v-for="(item, index) in infoList" :key="index">
          <td>{{item.goodsName}}</td>
          <td>{{item.price}}</td>
          <td>{{item.num}}</td>
          <td>{{item.totalPrice}}</td>
        </tr>
        <tr class="trs tr_title">
          <td colspan="3">商品总价（元）</td>
          <td>180</td>
        </tr>
      </table>
      <div class="custInfo" style="margin-top:20px;">订单详细</div>
      <el-table class="datail_tb" :data="infoList" border show-summary style="width: 100%">
        <el-table-column prop="goodsName" label="商品类型" align="center">
        </el-table-column>
        <el-table-column prop="price" label="销售额（元）" align="center">
        </el-table-column>
        <el-table-column prop="num" label="已退款金额（元）" align="center">
        </el-table-column>
        <el-table-column prop="totalPrice" label="实际销售额（元）" align="center">
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="detailVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import global from '../../global/global'
let echarts = require('../../../../node_modules/echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  props: ['orderInfo','echartData'],
  data() {
    return {
      detailVisible: false,
      tableData: null,
      infoList: [{
        goodsName: '商品名称1',
        price: 30,
        num: 2,
        totalPrice: 60
      },{
        goodsName: '商品名称2',
        price: 30,
        num: 2,
        totalPrice: 60
      },{
        goodsName: '商品名称3',
        price: 30,
        num: 2,
        totalPrice: 60
      }]
    }
  },
  created(){
    this.tableData = this.orderInfo
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
              text: '2017年6月份业绩记录',
              left: 'center'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['当日销售额（元）']
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
              name: '6月',
              boundaryGap: false,
              axisLabel:{
                 //X轴刻度配置
                interval: 0 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
              },
              data: ['1','2','3','4','5','6','7','8','9','10','20','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
          },
          yAxis: {
              type: 'value',
              name: '当日销售额（元）',
              max: 4000,
              min: 0,
              splitNumber: 10,
          },  
          series: [
              {
                  name:'总收入',
                  type:'line',
                  stack: '总收入',
                  data: [1, 3, 9, 27, 81, 247, 741,1, 3, 9, 27, 81, 247, 741,1, 3, 9, 27, 81, 247, 741,1, 3, 9, 27, 81, 247, 741,1, 3,999]
              }
          ]
      });

		},
    queryDetail(index, row){
      let params = {
        userPhone: row.userPhone,
        orderId: row.saleId,
        token: global.getSalesToken()
      }
      console.log('查看详情',params)
      global.axiosGetReq('/saleMyOrder/detail',params).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          console.log('查看详情',res.data.data)
          
        }else{
          this.$message.error('查询订单失败！');
        }
      })
      this.detailVisible = true
    }
	}
}
</script>

<style scope>
	.brandWarp{
    width: 1200px;
    margin: auto;
  }
  .fl{
    float:left;
  }
  .fr{
    float: right;
  }
  .clearfix{
    zoom:1;
  }
  .clearfix:after{
    content:"";
    clear:both;
    display:block;
  }
  .i_col_red{
    color: red;
    font-weight: bold;
    font-style: normal;
  }
  .margin_l{
    margin-left: 20px;
  }
  .total_box{
    width: 300px;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    background: #5db7e8;
    color: #fff;
    text-align: center;
  }
  .warp-breadcrum{
    margin-top: 36px;
  }
  .pad_l_30{
    padding-left: 30px;
  }
  .custInfo{
    height: 30px;
    line-height: 30px;
    padding-left: 24px;
    border-bottom: 1px dotted #EEF1F6;
    background: url(../../../images/salesman/arrow.png) 0 8px no-repeat;
  }
  .detail_title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    background: url(../../../images/salesman/titlebg.png) 400px 34px no-repeat;
  }
  .datail_tb{
    width: 100%;
    border-collapse: collapse;/* 边框合并属性  */
    margin-top: 20px;
  }
  .custContent{
    height: 70px;
    line-height: 70px;
    padding-left: 52px;
  }
  .datail_tb tr{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #EEF1F6;
  }
  .trs td{
    width: 100px;
    text-align: center;
    border: 1px solid #EEF1F6;
  }
  .tr_title{
    background: #EEF1F6;
  }
  .tr_title td{
    border: 1px solid #E8EAED;
  }
</style>