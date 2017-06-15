<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>交易管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="warp-main">
      <el-form label-width="80px">
        <el-form-item label="订单编号" class="fl t_input_width">
          <el-input v-model="input"></el-input>
        </el-form-item>
        <el-form-item label="买家信息" class="fl t_input_width">
          <el-input v-model="input" placeholder="输入收件人姓名或手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" class="fl">
          <el-select v-model="value" placeholder="全部" class="t_select_width">
				    <el-option
				      v-for="item in orderStat"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
        </el-form-item>
        <el-form-item label="是否退款" class="fl">
          <el-select v-model="value" placeholder="全部" class="fl t_select_width">
				    <el-option
				      v-for="item in drawback"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
        </el-form-item>
        <el-form-item label="下单时间" class="fl">
	          <el-date-picker
              v-model="value3"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
	  <el-table :data="orderList" style="width: 100%;text-align:center;" border>
	    <el-table-column prop="orderCode" label="订单编号" width="120" >
	    </el-table-column>
	    <el-table-column prop="totalPrice" label="总价（元）" width="120" >
	    </el-table-column>
	    <el-table-column prop="dryCurrency" label="乾币抵扣（元）" width="140" >
	    </el-table-column>
	    <el-table-column prop="payment" label="实际付款（元）" width="140" >
	    </el-table-column>
	    <el-table-column prop="buyerInfo" label="买家信息" width="120" >
	    </el-table-column>
	    <el-table-column prop="orderTime" label="下单时间" min-width="120" >
	    </el-table-column>
	    <el-table-column prop="orderStat" label="订单状态" min-width="120" >
        <template scope="scope">
          <span v-if="scope.row.orderStat == '1'">等待买家付款</span>
          <span v-if="scope.row.orderStat == '2'">买家已付款</span>
          <span v-if="scope.row.orderStat == '3'">订单已确认</span>
          <span v-if="scope.row.orderStat == '4'">卖家已发货</span>
          <span v-if="scope.row.orderStat == '5'">交易成功</span>
          <span v-if="scope.row.orderStat == '6'">交易关闭</span>
        </template>  
	    </el-table-column>
	    <el-table-column prop="logisticsInfo" label="物流信息" min-width="120" >
	    </el-table-column>
	    <el-table-column prop="drawback" label="是否退款" min-width="120" >
	    </el-table-column>
	    <el-table-column prop="handle" label="操作" min-width="180" >
        <template scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button
            size="mini"
            @click="handleClose(scope.$index, scope.row)">关闭交易</el-button>
          <el-button
            size="mini"
            type="success"
            v-show='scope.row.orderStat === "2"'
            @click="handleSure(scope.$index, scope.row)">确认订单</el-button>
          <el-button
            size="mini"
            type="danger"
            v-show='!(scope.row.orderStat === "1")'
            @click="handleDrawback(scope.$index, scope.row)">退款处理</el-button>
          <el-button
            size="mini"
            type="primary"
            v-show='scope.row.orderStat === "3"'
            @click="handleDelivery(scope.$index, scope.row)">仓库发货</el-button>
        </template>
	    </el-table-column>
	  </el-table>
	</el-row>
</template>

<script>
  export default {
    data() {
      return {
        orderStat: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '等待买家付款'
        }, {
          value: '2',
          label: '买家已付款'
        }, {
          value: '3',
          label: '订单已确认'
        }, {
          value: '4',
          label: '卖家已发货'
        }, {
          value: '5',
          label: '交易成功'
        }, {
          value: '6',
          label: '交易关闭'
        }],
         drawback: [{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '是'
        }, {
          value: '2',
          label: '否'
        }],
        input: "",
        value: '',
        value3: [new Date(2017, 10, 10, 10, 10), new Date(2017, 10, 11, 10, 10)],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        orderList: [{
          "orderCode": "ddbh2017053100001",
          "totalPrice": 500,
          "dryCurrency": 300,
          "payment": 200,
          "buyerInfo": "收件人+手机号",
          "orderTime": "2017-05-31-17:00",
          "orderStat": "1",
          "logisticsInfo": "",
          "drawback": "否",
          "handle": ""
        },{
          "orderCode": "ddbh2017053100001",
          "totalPrice": 500,
          "dryCurrency": 300,
          "payment": 200,
          "buyerInfo": "收件人+手机号",
          "orderTime": "2017-05-31-17:00",
          "orderStat": "2",
          "logisticsInfo": "",
          "drawback": "否",
          "handle": ""
        },{
          "orderCode": "ddbh2017053100001",
          "totalPrice": 500,
          "dryCurrency": 300,
          "payment": 200,
          "buyerInfo": "收件人+手机号",
          "orderTime": "2017-05-31-17:00",
          "orderStat": "3",
          "logisticsInfo": "",
          "drawback": "否",
          "handle": ""
        },{
          "orderCode": "ddbh2017053100001",
          "totalPrice": 500,
          "dryCurrency": 300,
          "payment": 200,
          "buyerInfo": "收件人+手机号",
          "orderTime": "2017-05-31-17:00",
          "orderStat": "4",
          "logisticsInfo": "申通XXXXX",
          "drawback": "是",
          "handle": ""
        },{
          "orderCode": "ddbh2017053100001",
          "totalPrice": 500,
          "dryCurrency": 300,
          "payment": 200,
          "buyerInfo": "收件人+手机号",
          "orderTime": "2017-05-31-17:00",
          "orderStat": "5",
          "logisticsInfo": "申通XXXXX",
          "drawback": "否",
          "handle": ""
        },{
          "orderCode": "ddbh2017053100001",
          "totalPrice": 500,
          "dryCurrency": 300,
          "payment": 200,
          "buyerInfo": "收件人+手机号",
          "orderTime": "2017-05-31-17:00",
          "orderStat": "6",
          "logisticsInfo": "",
          "drawback": "是",
          "handle": ""
        }]
      }
    },
    methods: {
      //详情
      handleDetail(index, row) {
        console.log(index, row);
      },
      //关闭交易
      handleClose(index, row) {
        console.log(index, row);
      },
      //确认交易
      handleSure(index, row) {
        console.log(index, row);
      },
      //退款处理
      handleDrawback(index, row) {
        console.log(index, row);
      },
      //仓库发货
      handleDelivery(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style>
.fl{
	float:left;
}
.clearfix{
	zoom:1;
}
.clearfix:after{
	content:"";
	clear:both;
	display:block;
}
.t_input_width{
	width:340px;
}
.t_select_width{
	width:260px;
}
.t_data_width{
	width:400px;
}
</style>