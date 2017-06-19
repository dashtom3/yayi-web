<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>交易管理</b></el-breadcrumb-item>
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
          <el-select v-model="value1" placeholder="全部" class="fl t_select_width">
				    <el-option
				      v-for="item in drawback"
				      :key="item.value1"
				      :label="item.label1"
				      :value="item.value1">
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
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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

      <!--详情界面-->
      <el-dialog title="订单详情" v-model="detailVisible" :close-on-click-modal="false">
        <h3 class="detail_h3">订单状态:<span style="padding-left:20px;">订单已确认</span></h3>
        <h4 class="detail_h4">收货信息</span></h4>
        <template>
          <el-table
            :data="receivingInfo"
            style="width: 100%">
            <el-table-column
              prop="userCode"
              label="用户编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="收货人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="localtion"
              label="所在地区"
              width="180">
            </el-table-column>
            <el-table-column
              prop="detailAddr"
              label="详细地址">
            </el-table-column>
          </el-table>
        </template>
        <h4 class="detail_h4">订单信息</h4>
        <div class="order_header">
          <span style="padding-left:20px;">{{orderInfo.orderDate}}</span>
          <span style="padding-left:100px;">订单号：{{orderInfo.orderNo}}</span>
          <span style="padding-left:120px;">下单时间：{{orderInfo.orderTime}}</span>
        </div>
        <div class="order_header">
          <span style="padding-left:170px;">商品</span>
          <span style="padding-left:100px;">SKU代码</span>
          <span style="padding-left:90px;">单价</span>
          <span style="padding-left:90px;">数量</span>
        </div>
        <div class="order_box clearfix">
          <div class="order_content fl" v-for="item in orderInfo.goodsInfo">
            <div class="img_list fl">
              <img src="../../../images/center/order.png" alt="图片无法显示">
            </div>
            <div class="goodsName fl goods_common">{{item.goodsName}}</div>
            <div class="snkCode fl goods_common">{{item.SKUCode}}</div>
            <div class="price fl goods_common">{{'￥'+item.price.toFixed(2)}}</div>
            <div class="goodsNum fl goods_common">{{item.goodsNum}}</div>
          </div>
          <div class="order_sum fl">
            <div class="order_h">{{'￥'+orderInfo.totalPrice.toFixed(2)}}</div>
            <div class="order_h">（含运费:￥68.00）</div>
            <div class="order_h">（乾币已抵扣:￥2.00）</div>
          </div>
        </div>
        <div class="pay_info clearfix">
          <ul class="fl" style="width:130px;">
            <li>支付方式</li>
            <li>发票</li>
            <li>产品注册证</li>
            <li>订单留言</li>
          </ul>
          <ul class="fl">
            <li>支付宝</li>
            <li>
              <div>不申请发票<i class="i_col_red margin_l_30">申请发票</i><i class="i_col_red margin_l_30">发票抬头：xxxxxx</i></div>
            </li>
            <li>
              <div>不需要产品认证<i class="i_col_red margin_l_30">不需要产品认证</i></div>
            </li>
            <li>留言为空</li>
          </ul>
        </div>
        <div class="seller_remark">
          <div>卖家备注</div>
          <div class="remark_content">xxxxxxxxxxxxxxxxxxxxxxxxx</div>
        </div>
        <div class="refund_info">
          <div>退款信息</div>
          <table class="refund_tb">
            <tr style="background:#ddd;">
              <td colspan="7" style="text-align:left;">
                <span style="padding-left:10px;">实付款：{{'￥'+orderInfo.totalPrice.toFixed(2)}}</span>
                <span style="padding-left:90px;">运费：包邮</span>
                <span style="padding-left:90px;">乾币抵扣：20</span>
              </td>
            </tr>
            <tr style="background:#ddd;">
              <td>sku代码</td>
              <td>商品名称+属性</td>
              <td>价格*数量</td>
              <td>退货数量</td>
              <td>退款金额</td>
              <td>退回的乾币数</td>
              <td>扣除的乾币数</td>
            </tr>
            <tr v-for="item in orderInfo.goodsInfo">
              <td></td>
              <td>{{item.goodsName}}</td>
              <td>{{item.price + '*' + item.goodsNum}}</td>
              <td>1</td>
              <td><i class="i_col_red">0</i></td>
              <td><i class="i_col_red">20</i></td>
              <td><i class="i_col_red">0</i></td>
            </tr>
          </table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailVisible=false">关闭</el-button>
        </div>
      </el-dialog>

      <!-- 关闭交易 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 仓库发货 -->
      <el-dialog title="发货" style="width:860px;margin:auto;" v-model="deliveryVisible" :close-on-click-modal="false">
        <div style="height:40px;">
          <i class="i_col_red">*</i>
          <span>物流公司：</span>
          <template>
            <el-select v-model="value" size="small" placeholder="全部">
              <el-option
                v-for="item in orderStat"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </div>
        <div  style="height:40px;">
          <i class="i_col_red">*</i>
          <span>快递单号：</span>
          <template>
            <el-input style="width:215px;" size="small"></el-input>
          </template>
        </div>
        <div>
          <el-button class="btn_">确定</el-button>
          <el-button class="btn_" type="primary" @click="deliveryVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <!-- 退款处理 -->
      <el-dialog title="退款处理" v-model="refundVisible" :close-on-click-modal="false">
        <table class="refund_tb">
            <tr style="background:#ddd;">
              <td colspan="7" style="text-align:left;">
                <span>订单编号：xxxxxxxxx</span>
                <span style="padding-left:90px;">实付款：xxxxxxxxx</span>
                <span style="padding-left:90px;">运费：包邮</span>
                <span style="padding-left:90px;">乾币抵扣：20</span>
              </td>
            </tr>
            <tr style="background:#ddd;">
              <td>是否退款</td>
              <td>商品名称+属性</td>
              <td>价格*数量</td>
              <td>退货数量</td>
              <td>退款金额</td>
              <td>退回的乾币数</td>
              <td>扣除的乾币数</td>
            </tr>
            <tr v-for="item in orderInfo.goodsInfo">
              <td>
                <template>
                  <el-checkbox v-model="checked" size="small"></el-checkbox>
                </template>
              </td>
              <td>{{item.goodsName}}</td>
              <td>{{item.price + '*' + item.goodsNum}}</td>
              <td>1</td>
              <td><i class="i_col_red">0</i></td>
              <td><i class="i_col_red">20</i></td>
              <td><i class="i_col_red">0</i></td>
            </tr>
          </table>
          <div class="btn_box">
            <el-button class="_btn" type="primary">保存</el-button>
            <el-button class="_btn" @click="refundVisible = false">取消</el-button>
          </div>
      </el-dialog>
    </el-col>
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
          value1: '0',
          label1: '全部'
        },{
          value1: '1',
          label1: '是'
        }, {
          value1: '2',
          label1: '否'
        }],
        input: '',
        value: '',
        value1: '',
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
        }],
        detailVisible: false,//详情界面开关
        dialogVisible: false,//关闭开关
        deliveryVisible: false,//仓库发货开关
        refundVisible: false,//退款处理开关
        receivingInfo: [{
          userCode: 'xxxxxx',
          userName: '张三',
          localtion: '上海市静安区',
          detailAddr: '共和新路街道洛川中路1100弄31号103（居委会）'
        }],
        orderInfo: {
          orderDate: '2017-05-27',
          orderNo: '173828478CSJHC',
          orderTime: 'xxxxxxxxxxx',
          totalPrice: 156,
          goodsInfo:[{
            goodsSrc: '',
            goodsName: '商品名称1',
            SKUCode: 'xxxxxxxxx',
            price: 39,
            goodsNum: 2
          },{
            goodsSrc: '',
            goodsName: '商品名称2',
            SKUCode: 'xxxxxxxxx',
            price: 39,
            goodsNum: 2
          }]
        }
      }
    },
    methods: {
      //详情
      handleDetail(index, row) {
        this.detailVisible = true;
      },
      //关闭交易
      handleClose(index, row) {
        this.$confirm('确认关闭交易吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //确认交易
      handleSure(index, row) {
        this.$confirm('该订单的款已到账？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //退款处理
      handleDrawback(index, row) {
        this.refundVisible = true;
      },
      //仓库发货
      handleDelivery(index, row) {
        this.deliveryVisible = true;
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
.detail_h3{
  margin-bottom:16px;
}
.detail_h4{
  border-bottom:1px solid #ccc;
  margin-bottom:8px;
  padding-bottom:4px;
}
/*订单信息*/
.order_header{
  background: #eee;
  height: 40px;
  line-height: 40px;
}
.order_box{
  position: relative;
}
.order_content{
  width: 70%;
  padding: 20px 0;
  border: 1px solid #eee;
  border-top: none;
  box-sizing:border-box;
}
.order_sum{
  position: absolute;
  right: 0;
  top: -1px;
  width: 30%;
  height: 257px;
  border: 1px solid #eee;
  border-left: none;
  text-align: center;
  box-sizing:border-box;
}
.order_h{
  padding-top: 18px;
}
.img_list{
  text-align: center;
  margin-left: 18px;
  border: 1px solid #ccc;
  padding-left: 6px;
}
.goods_common{
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.goodsName{
  width: 160px;
}
.snkCode{
  width: 132px;
}
.price{
  width: 140px;
}
.goodsNum{
  width: 96px;
}
.i_col_red{
  color: red;
  font-style: normal;
}
.margin_l_30{
  margin-left: 30px;
}
/*支付方式*/
.pay_info{
  padding-bottom: 30px;
}
.pay_info li{
  height: 40px;
  line-height: 40px;
}
/*卖家备注*/
.seller_remark{
  height: 120px;
  padding-top: 20px;
  border-top: 1px solid #666;
}
.remark_content{
  padding-left: 60px;
}
/*退款信息*/
.refund_info{
  padding-top: 20px;
  border-top: 1px solid #666;
}
.refund_tb{
  width: 100%;
  border-collapse: collapse;/* 边框合并属性  */ 
  border: none;
  margin-top: 20px;
}
.refund_tb tr{
  width: 100%;
  border: 1px solid #ccc;
}
.refund_tb td{
  text-align: center;
  padding: 4px 2px;
  border: 1px solid #ccc;
}
/* 仓库发货 */
.btn_{
  margin-left: 120px;
}
.btn_box{
  width: 260px;
  margin: 20px auto;
}
._btn{
  width: 120px;
}
</style>