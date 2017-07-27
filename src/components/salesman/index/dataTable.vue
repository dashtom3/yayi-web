<template>
	<div>
		<el-col :span="24" class="warp-breadcrum">
      <div id="myChart" :style="{width: '1200px', height: '600px', margin: 'auto' }"></div>
    </el-col>
    <el-col :span="24" style="margin-bottom:10px;margin-top:40px;">
      <div class="grid-content bg-purple-dark fl">
        <span>销售总额：<i class="i_col_red">￥<span>{{tableData.saleAllMoney}}</span></i></span>
        <span class="margin_l">耗材类销售总额：<i class="i_col_red">￥{{tableData.haocaiAllMoney}}</i></span>
        <span class="margin_l">工具设备类销售总额：<i class="i_col_red">￥{{tableData.gongjuAllMoney}}</i></span>
      </div>
      <div class="grid-content bg-purple-dark fr">
        <span class="margin_l">共：<i class="i_col_red">{{tableData.orderNum}}</i>单</span>
      </div>
    </el-col>
		<el-col :span="24" class="warp-main" style="margin: auto;margin-bottom:100px;">
      <el-table :data="tableData.myOrderVoList" align="center" border style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="orderCreated" align="center" label="下单时间" width="210">
        </el-table-column>
        <el-table-column prop="userName" align="center" label="客户姓名">
        </el-table-column>
        <el-table-column prop="userPhone" align="center" label="客户手机号" width="150">
        </el-table-column>
        <el-table-column prop="allMoney" align="center" label="销售额（元）">
        </el-table-column>
        <el-table-column prop="haocaiMoney"  align="center"label="耗材类（元）">
        </el-table-column>
        <el-table-column prop="gongjuMoney" align="center" label="工具设备类（元）">
        </el-table-column>
        <el-table-column prop="refundMoney" align="center" label="已退款金额（元）">
        </el-table-column>
        <el-table-column prop="actualMoney" align="center" label="实际销售额（元）">
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
      <div class="custContent"><b>客户姓名：</b><span>{{this.detailObj.userName}}</span><b style="margin-left:80px;">客户手机号：</b><span>{{this.detailObj.userPhone}}</span></div>
      <div class="custInfo">订单信息</div>
      <table class="datail_tb">
        <tr><td colspan="7"><span class="pad_l_30">下单时间：{{this.detailObj.orderCreated}}</span><span class="pad_l_30">订单状态：卖家已发货</span></td></tr>
        <tr class="trs tr_title">
          <th>商品名称+属性</th>
          <th>价格（元）</th>
          <th>数量</th>
          <th>小计</th>
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
       <table class="datail_tb">
        <tr class="trs tr_title">
          <th>商品类型</th>
          <th>销售额（元）</th>
          <th>已退款金额（元）</th>
          <th>实际销售额（元）</th>
        </tr>
        <tr class="trs">
          <td>{{this.orderDetailList[0].itemName}}</td>
          <td>{{this.orderDetailList[0].orderMoneyHaocai}}</td>
          <td>{{this.orderDetailList[0].refundMoneyHaocai}}</td>
          <td>{{this.orderDetailList[0].actualMoneyHaocai}}</td>
        </tr>
        <tr class="trs">
          <td>{{this.orderDetailList[1].itemName}}</td>
          <td>{{this.orderDetailList[1].orderMoneyGongju}}</td>
          <td>{{this.orderDetailList[1].refundMoneyGongju}}</td>
          <td>{{this.orderDetailList[1].actualMoneyGongju}}</td>
        </tr>
      </table>
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
  props: ['orderInfo','echartData','echartsTitle','monthX'],
  data() {
    return {
      detailVisible: false,
      tableData: null,
      monthxVal: 30,
      monthList: [],
      echartsList: [],
      maxechartsList: 0,
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
      }],
      orderDetailList: [{
        itemName: '耗材类',
        salesAmt: 3000,
        refundAmt: 200,
        realSaleAmt: 2800
      },
      {
        itemName: '工具设备类',
        salesAmt: 4000,
        refundAmt: 100,
        realSaleAmt: 3900
      }],
      detailObj: {}
    }
  },
  created(){
    this.tableData = this.orderInfo
    this.maxechartsList = Math.max.apply({},this.echartsList)

    for(var i=0;i<this.monthxVal+1;i++){
      this.monthList.push(i)
    }

  },
  watch: {
    maxechartsList: function(){
      this.drawLine();
    },
    echartData: function(){
      this.drawLine();
    },
    echartsTitle: function(){
      this.drawLine();
    },
    monthX: function(){
      this.drawLine();
    }
  },
	methods: {
		drawLine(){

      // 基于准备好的dom，初始化echarts实例
      var mainChart = echarts.getInstanceByDom(document.getElementById('myChart'));
      if (mainChart === undefined) {  
        mainChart = echarts.init(document.getElementById('myChart'));
      }
      // 绘制图表
      mainChart.setOption({
          title: {
              text: this.echartsTitle,
              left: 'center'
          },
          tooltip: {
              trigger: 'axis',
              formatter: function (params, ticket, callback) {  
              //x轴名称  
              var name = params[0].name  
              //图表title名称  
              var seriesName = params[0].seriesName  
              //值  
              var value = params[0].value  
              return seriesName + '<br />' + '第'+ name + '天' + '<br />' + value
        }  
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
              name: this.monthX+"月",
              boundaryGap: false,
              axisLabel:{
                 //X轴刻度配置
                interval: 4 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
              },
              data: this.monthList
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
                  name:'当日销售额（元）',
                  type:'line',
                  stack: '当日销售额（元）',
                  data: this.echartData
              }
          ]
      });

		},
    queryDetail(index, row){
      let params = {
        orderId: row.orderId,
        token: global.getSalesToken()
      }
      console.log('查看详情',params)
      global.axiosGetReq('/saleMyOrder/detail',params).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          console.log('查看详情',res.data.data)
          this.detailObj = res.data.data
          // this.infoList = res.data.data.orderInfoVoList
          this.orderDetailList[0] = {
            itemName: '耗材类',
            orderMoneyHaocai: res.data.data.orderMoneyHaocai,
            refundMoneyHaocai: res.data.data.refundMoneyHaocai,
            actualMoneyHaocai: res.data.data.actualMoneyHaocai,
          }
          this.orderDetailList[1] = {
            itemName: '工具设备类',
            orderMoneyGongju: res.data.data.orderMoneyGongju,
            refundMoneyGongju: res.data.data.refundMoneyGongju,
            actualMoneyGongju: res.data.data.actualMoneyGongju,
          }
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
  .tr_title td, .tr_title th{
    border: 1px solid #E8EAED;
  }
</style>